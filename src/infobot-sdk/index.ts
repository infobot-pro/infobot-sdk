import {v1 as uuid} from 'uuid'
import EventEmitter from 'events'
import WebSocket from 'ws'
import InfobotCall from './call'
import {WS_EVENTS, APP_EVENTS} from './events'
import {ACTIONS, auth, makeCall} from './actions'
import {InfobotConfig, WsMessage} from './types'

export default class Infobot extends EventEmitter {
    ws: WebSocket
    calls: Record<string, InfobotCall> = {}

    private callTimers: Record<string, NodeJS.Timeout> = {}

    constructor(
        private config: InfobotConfig,
        public maxCallTimeout = 5 * 60 * 1000,
        public maxListeners = 200,
        public reconnectTimeout = 500
    ) {
        super()
        this.setMaxListeners(maxListeners)
    }

    start() {
        this.connect()
        return this
    }

    private send(data: any) {
        this.ws.send(JSON.stringify(data))
    }

    private handleWsMessage(messageData: WebSocket.Data): void {
        const message = JSON.parse(messageData as string)

        const {event} = message as WsMessage

        switch (event) {
            case WS_EVENTS.AUTH_OK:
                this.emit(APP_EVENTS.CONNECTED)
                break
            case WS_EVENTS.AUTH_FAIL:
                this.emit(APP_EVENTS.AUTH_FAIL)
                break
            case WS_EVENTS.FILE_STORED:
                this.emit(APP_EVENTS.FILE_STORED, message)
                break
            case WS_EVENTS.FILE_STORE_ERROR:
                this.emit(APP_EVENTS.FILE_STORE_ERROR, message)
                break
            default:
                this.handleCallWsMessage(message)
        }
    }

    private handleCallWsMessage(message: WsMessage) {
        const {event} = message

        let call = this.getCall(message.callID)

        if (!call) {
            call = new InfobotCall(message.callID, this.ws, message.params)
            this.calls[message.callID] = call
        }

        if (event === WS_EVENTS.ERROR) {
            this.emit(APP_EVENTS.BOT_ERROR, call)
            call.processEvent(APP_EVENTS.BOT_ERROR, message.params, message)
            return
        }

        if (event === WS_EVENTS.CALL_DISCONNECTED) {
            call.isConnected = false
            this.removeCall(message.callID)
        }

        this.emit(event, call, message.params)

        // TODO: list of available call events
        call.processEvent(event, message.params, message)

        if (message.event === WS_EVENTS.PING) call.pong()
    }

    private connect() {
        this.ws = new WebSocket(this.config.url)
        this.ws.on('open', () => this.send(auth(this.config.appId, this.config.key)))
        this.ws.on('message', this.handleWsMessage.bind(this))
        this.ws.on('close', this.reconnect.bind(this))
        this.ws.on('error', this.reconnect.bind(this))
    }

    private reconnect() {
        this.ws.removeAllListeners()
        this.removeAllListeners('callAnswered')
        this.removeAllListeners('incomingCall')
        this.removeAllListeners('voicemail')
        this.removeAllListeners('callFinished')
        this.removeAllListeners('beforeCall')
        this.removeAllListeners('callNoAnswer')
        this.removeAllListeners('callFailed')
        this.removeAllListeners('callBusy')
        this.removeAllListeners('callIncorrectNumber')
        this.calls = {}

        if (this.config.disableReconnect !== true) {
            setTimeout(() => this.connect(), this.reconnectTimeout)
        }
    }

    stopApp() {
        this.ws.send(
            JSON.stringify({
                action: ACTIONS.STOP_APP,
            })
        )
    }


    getCallsCount() {
        return this.calls.length;
    }

    getCall(callId: string) {
        const call = this.calls[callId]
        if (!call) return undefined
        this.touchCall(callId)
        return call
    }

    removeCall(callId: string) {
        return this.calls[callId] && delete this.calls[callId]
    }

    makeCall(to: any, opts: any) {
        const callID = uuid()
        const call = new InfobotCall(callID, this.ws)
        const params = {...opts, appID: this.config.appId, callID}

        this.send(makeCall({to, params}))

        return call
    }

    private touchCall(callId: string) {
        if (this.callTimers[callId]) {
            clearTimeout(this.callTimers[callId])
        } else {
            this.callTimers[callId] = setTimeout(this.removeCall.bind(this), this.maxCallTimeout, callId)
        }
    }
}

import {v4 as uuid} from 'uuid'
import EventEmitter from 'events'
import InfobotCall from './call'
import {APP_EVENTS, WS_CALL_EVENTS} from './events'
import {WsMessage} from './types'
import {startSpeechRecognition, startSpeechRecognitionWithCustomConfig, stopSpeechRecognition} from './actions'

export default class InfobotSpeechRecognition extends EventEmitter {
    id: string = uuid()

    constructor(private call: InfobotCall) {
        super()
        this.setMaxListeners(200)
        this.initEventHandlers()
    }

    initEventHandlers() {
        this.call.on(WS_CALL_EVENTS.SPEECH_RECOGNITION_TIMEOUT, (message: WsMessage) => {
            if (message.sessionID !== this.id) return
            this.emit(APP_EVENTS.SPEECH_RECOGNITION_TIMEOUT, message)
        })

        this.call.on(WS_CALL_EVENTS.TRANSCRIBE, (message: WsMessage) => {
            if (message.sessionID !== this.id) return
            this.emit(APP_EVENTS.TRANSCRIBE, message)
        })
    }

    startSpeechRecognition(provider: any, language: any, grammar: any, timeout: any) {
        this.call.send(startSpeechRecognition(this.id, provider, language, grammar, timeout))
        return this
    }

    startSpeechRecognitionWithCustomConfig(provider: string, config: any) {
        this.call.send(startSpeechRecognitionWithCustomConfig(this.id, provider, config))
        return this
    }

    stopSpeechRecognition() {
        this.call.send(stopSpeechRecognition(this.id))
        return this
    }
}

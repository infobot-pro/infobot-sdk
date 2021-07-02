"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const events_1 = __importDefault(require("events"));
const ws_1 = __importDefault(require("ws"));
const call_1 = __importDefault(require("./call"));
const events_2 = require("./events");
const actions_1 = require("./actions");
class Infobot extends events_1.default {
    constructor(config, maxCallTimeout = 5 * 60 * 1000, maxListeners = 200, reconnectTimeout = 500) {
        super();
        this.config = config;
        this.maxCallTimeout = maxCallTimeout;
        this.maxListeners = maxListeners;
        this.reconnectTimeout = reconnectTimeout;
        this.calls = {};
        this.callTimers = {};
        this.setMaxListeners(maxListeners);
    }
    start() {
        this.connect();
        return this;
    }
    send(data) {
        this.ws.send(JSON.stringify(data));
    }
    handleWsMessage(messageData) {
        const message = JSON.parse(messageData);
        const { event } = message;
        switch (event) {
            case events_2.WS_EVENTS.AUTH_OK:
                this.emit(events_2.APP_EVENTS.CONNECTED);
                break;
            case events_2.WS_EVENTS.AUTH_FAIL:
                this.emit(events_2.APP_EVENTS.AUTH_FAIL);
                break;
            case events_2.WS_EVENTS.FILE_REQUEST:
                this.emit(events_2.APP_EVENTS.FILE_REQUEST, message.params.fileHash);
                break;
            case events_2.WS_EVENTS.FILE_STORED:
                this.emit(events_2.APP_EVENTS.FILE_STORED, message);
                break;
            case events_2.WS_EVENTS.FILE_STORE_ERROR:
                this.emit(events_2.APP_EVENTS.FILE_STORE_ERROR, message);
                break;
            default:
                this.handleCallWsMessage(message);
        }
    }
    handleCallWsMessage(message) {
        const { event } = message;
        let call = this.getCall(message.callID);
        if (!call) {
            call = new call_1.default(message.callID, this.ws, message.params);
            this.calls[message.callID] = call;
        }
        if (event === events_2.WS_EVENTS.ERROR) {
            this.emit(events_2.APP_EVENTS.BOT_ERROR, call);
            call.processEvent(events_2.APP_EVENTS.BOT_ERROR, message.params, message);
            return;
        }
        if (event === events_2.WS_EVENTS.CALL_DISCONNECTED) {
            call.isConnected = false;
            this.removeCall(message.callID);
        }
        this.emit(event, call, message.params);
        // TODO: list of available call events
        call.processEvent(event, message.params, message);
        if (message.event === events_2.WS_EVENTS.PING)
            call.pong();
    }
    connect() {
        this.ws = new ws_1.default(this.config.url);
        this.ws.on('open', () => this.send(actions_1.auth(this.config.appId, this.config.key)));
        this.ws.on('message', this.handleWsMessage.bind(this));
        this.ws.on('close', this.reconnect.bind(this));
        this.ws.on('error', this.reconnect.bind(this));
    }
    reconnect() {
        this.ws.removeAllListeners();
        this.removeAllListeners('callAnswered');
        this.removeAllListeners('incomingCall');
        this.removeAllListeners('voicemail');
        this.removeAllListeners('callFinished');
        this.removeAllListeners('beforeCall');
        this.removeAllListeners('callNoAnswer');
        this.removeAllListeners('callFailed');
        this.removeAllListeners('callBusy');
        this.removeAllListeners('callIncorrectNumber');
        this.calls = {};
        if (this.config.disableReconnect !== true) {
            setTimeout(() => this.connect(), this.reconnectTimeout);
        }
    }
    getCall(callId) {
        const call = this.calls[callId];
        if (!call)
            return undefined;
        this.touchCall(callId);
        return call;
    }
    removeCall(callId) {
        return this.calls[callId] && delete this.calls[callId];
    }
    makeCall(to, opts) {
        const callID = uuid_1.v1();
        const call = new call_1.default(callID, this.ws);
        const params = Object.assign(Object.assign({}, opts), { appID: this.config.appId, callID });
        this.send(actions_1.makeCall({ to, params }));
        return call;
    }
    touchCall(callId) {
        if (this.callTimers[callId]) {
            clearTimeout(this.callTimers[callId]);
        }
        else {
            this.callTimers[callId] = setTimeout(this.removeCall.bind(this), this.maxCallTimeout, callId);
        }
    }
}
exports.default = Infobot;
//# sourceMappingURL=index.js.map
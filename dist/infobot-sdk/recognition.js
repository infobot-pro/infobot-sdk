"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const events_1 = __importDefault(require("events"));
const events_2 = require("./events");
const actions_1 = require("./actions");
class InfobotSpeechRecognition extends events_1.default {
    constructor(call) {
        super();
        this.call = call;
        this.id = uuid_1.v4();
        this.setMaxListeners(200);
        this.initEventHandlers();
    }
    initEventHandlers() {
        this.call.on(events_2.WS_CALL_EVENTS.SPEECH_RECOGNITION_TIMEOUT, (message) => {
            if (message.sessionID !== this.id)
                return;
            this.emit(events_2.APP_EVENTS.SPEECH_RECOGNITION_TIMEOUT, message);
        });
        this.call.on(events_2.WS_CALL_EVENTS.TRANSCRIBE, (message) => {
            if (message.sessionID !== this.id)
                return;
            this.emit(events_2.APP_EVENTS.TRANSCRIBE, message);
        });
    }
    startSpeechRecognition(provider, language, grammar, timeout) {
        this.call.send(actions_1.startSpeechRecognition(this.id, provider, language, grammar, timeout));
        return this;
    }
    startSpeechRecognitionWithCustomConfig(provider, config) {
        this.call.send(actions_1.startSpeechRecognitionWithCustomConfig(this.id, provider, config));
        return this;
    }
    stopSpeechRecognition() {
        this.call.send(actions_1.stopSpeechRecognition(this.id));
        return this;
    }
}
exports.default = InfobotSpeechRecognition;
//# sourceMappingURL=recognition.js.map
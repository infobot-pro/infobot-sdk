"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const uuid_1 = require("uuid");
const actions_1 = require("./actions");
const events_2 = require("./events");
class InfobotRecording extends events_1.default {
    constructor(call) {
        super();
        this.call = call;
        this.id = uuid_1.v1();
        this.setMaxListeners(200);
        this.initEventHandlers();
    }
    initEventHandlers() {
        this.call.on(events_2.WS_CALL_EVENTS.RECORDING_COMPLETE, (message) => {
            if (message.recordingID !== this.id)
                return;
            this.emit(events_2.APP_EVENTS.RECORDING_COMPLETE, message);
        });
        this.call.on(events_2.WS_CALL_EVENTS.RECORDING_FAILED, (message) => {
            if (message.recordingID !== this.id)
                return;
            this.emit(events_2.APP_EVENTS.RECORDING_FAILED, message);
        });
        this.call.on(events_2.WS_CALL_EVENTS.RECORDING_SESSION_NOT_FOUND, (message) => {
            if (message.recordingID !== this.id)
                return;
            this.emit(events_2.APP_EVENTS.RECORDING_SESSION_NOT_FOUND, message);
        });
        this.call.on(events_2.WS_CALL_EVENTS.BOT_ERROR, function (message) {
            if (message.recordingID !== this.id)
                return;
            this.emit(events_2.APP_EVENTS.BOT_ERROR, message);
        });
    }
    startRecording(format) {
        this.call.send(actions_1.startAudioRecord(this.id, format));
        return this;
    }
    stopRecording() {
        this.call.send(actions_1.stopAudioRecord(this.id));
        return this;
    }
}
exports.default = InfobotRecording;
//# sourceMappingURL=recording.js.map
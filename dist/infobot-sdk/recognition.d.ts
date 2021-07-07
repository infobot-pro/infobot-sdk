/// <reference types="node" />
import EventEmitter from 'events';
import InfobotCall from './call';
export default class InfobotSpeechRecognition extends EventEmitter {
    private call;
    id: string;
    constructor(call: InfobotCall);
    initEventHandlers(): void;
    startSpeechRecognition(provider: any, language: any, grammar: any, timeout: any): this;
    stopSpeechRecognition(): this;
}

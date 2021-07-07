/// <reference types="node" />
import EventEmitter from 'events';
import InfobotCall from './call';
export default class InfobotRecording extends EventEmitter {
    private call;
    id: string;
    constructor(call: InfobotCall);
    private initEventHandlers;
    startRecording(format: any): this;
    stopRecording(): this;
}

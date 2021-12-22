/// <reference types="node" />
import EventEmitter from 'events';
import WebSocket from 'ws';
import InfobotCall from './call';
import { InfobotConfig } from './types';
export default class Infobot extends EventEmitter {
    private config;
    maxCallTimeout: number;
    maxListeners: number;
    reconnectTimeout: number;
    ws: WebSocket;
    calls: Record<string, InfobotCall>;
    private callTimers;
    constructor(config: InfobotConfig, maxCallTimeout?: number, maxListeners?: number, reconnectTimeout?: number);
    start(): this;
    private send;
    private handleWsMessage;
    private handleCallWsMessage;
    private connect;
    private reconnect;
    stopApp(): void;
    getCallsCount(): number;
    getCall(callId: string): InfobotCall;
    removeCall(callId: string): boolean;
    makeCall(to: any, opts: any): InfobotCall;
    private touchCall;
}

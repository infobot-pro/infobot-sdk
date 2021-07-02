"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WS_CALL_EVENTS = exports.APP_EVENTS = exports.WS_EVENTS = void 0;
exports.WS_EVENTS = {
    WS_SEND: 'wsSend',
    WS_RECEIVE: 'wsReceive',
    ERROR: 'error',
    AUTH_OK: 'auth-ok',
    AUTH_FAIL: 'auth-fail',
    FILE_REQUEST: 'file-request',
    FILE_STORED: 'file-stored',
    FILE_STORE_ERROR: 'file-store-error',
    CALL_DISCONNECTED: 'call-disconnected',
    PING: 'ping',
};
exports.APP_EVENTS = {
    AUTH_FAIL: 'AUTH_FAIL',
    BOT_ERROR: 'botError',
    FILE_REQUEST: 'FILE_REQUEST',
    FILE_STORED: 'FILE_STORED',
    FILE_STORE_ERROR: 'FILE_STORE_ERROR',
    CONNECTED: 'CONNECTED',
    RECORDING_FAILED: 'recordingSessionNotFound',
    RECORDING_COMPLETE: 'recordingComplete',
    RECORDING_SESSION_NOT_FOUND: 'recordingSessionNotFound',
    CALL_DISCONNECTED: 'call-disconnected',
    PLAYBACK_FINISHED: 'playbackFinished',
    SPEECH_RECOGNITION_TIMEOUT: 'speech-recognition-timeout',
    TRANSCRIBE: 'transcribe',
};
exports.WS_CALL_EVENTS = {
    BOT_ERROR: 'botError',
    RECORDING_SESSION_NOT_FOUND: 'recordingSessionNotFound',
    RECORDING_FAILED: 'recordingSessionNotFound',
    RECORDING_COMPLETE: 'recordingComplete',
    TRANSCRIBE: 'transcribe',
    SPEECH_RECOGNITION_TIMEOUT: 'speech-recognition-timeout',
    PLAYBACK_FINISHED: 'playbackFinished',
    CALL_DISCONNECTED: 'call-disconnected',
};
//# sourceMappingURL=events.js.map
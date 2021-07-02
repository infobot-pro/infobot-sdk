export const WS_EVENTS = {
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
}

export const APP_EVENTS = {
  AUTH_FAIL: 'AUTH_FAIL',
  BOT_ERROR: 'botError',
  FILE_REQUEST: 'FILE_REQUEST',
  FILE_STORED: 'FILE_STORED',
  FILE_STORE_ERROR: 'FILE_STORE_ERROR',
  CONNECTED: 'connected',
  RECORDING_FAILED: 'recordingSessionNotFound',
  RECORDING_COMPLETE: 'recordingComplete',
  RECORDING_SESSION_NOT_FOUND: 'recordingSessionNotFound',
  CALL_DISCONNECTED: 'call-disconnected',
  PLAYBACK_FINISHED: 'playbackFinished',
  SPEECH_RECOGNITION_TIMEOUT: 'speech-recognition-timeout',
  TRANSCRIBE: 'transcribe',
}

export const WS_CALL_EVENTS = {
  BOT_ERROR: 'botError',
  RECORDING_SESSION_NOT_FOUND: 'recordingSessionNotFound',
  RECORDING_FAILED: 'recordingSessionNotFound',
  RECORDING_COMPLETE: 'recordingComplete',
  TRANSCRIBE: 'transcribe',
  SPEECH_RECOGNITION_TIMEOUT: 'speech-recognition-timeout',
  PLAYBACK_FINISHED: 'playbackFinished',
  CALL_DISCONNECTED: 'call-disconnected',
}

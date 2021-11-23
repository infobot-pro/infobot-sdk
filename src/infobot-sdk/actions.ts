import { v1 as uuid } from 'uuid'
import { Variable } from './types'

export const ACTIONS = {
  PONG: 'PONG',
  AUTH: 'auth',
  MAKE_CALL: 'make-call',
  HANGUP: 'hangup',
  ANSWER: 'answer',
  RING: 'ring',
  STOP_DELIVERY: 'stop-delivery',
  STOP_TRY: 'stop-try',
  START_CALL: 'start-call',
  FINISH_CALL: 'finish-call',
  START_AUDIO_STREAM: 'start-audio-stream',
  STOP_AUDIO_STREAM: 'stop-audio-stream',
  FORWARAD_AUDIO_STREAM: 'forward-audio-stream',
  SEND_SMS: 'send-sms',
  CALL_FORWARD: 'call-forward',
  START_BACKGROUND_SOUND: 'start-background-sound',
  STOP_BACKGROUND_SOUND: 'stop-background-sound',
  CACHE_TTS: 'cache-tts',
  START_AUDIO_RECORD: 'start-audio-record',
  STOP_AUDIO_RECORD: 'stop-audio-record',
  TTS_ACTION: 'tts',
  PLAYBACK_ACTION: 'playback',
  PLAYBACK_FILE: 'playback-file',
  STOP_PLAYBACK: 'stop-playback',
  FILE_RESPONSE: 'file-response',
  START_SPEECH_RECOGNITION: 'start-speech-recognition',
  STOP_SPEECH_RECOGNITION: 'stop-speech-recognition',
  REACH_MARKER: 'marker',
  VARIABLES_SET: 'variables-set',
  VARIABLES_DELETE: 'variables-delete',
  VARIABLES_GET: 'variables-get',
}

export function variablesGet() {
  return { action: ACTIONS.VARIABLES_GET }
}

export function variablesSet(variables: Array<Variable>) {
  return { action: ACTIONS.VARIABLES_SET, params: { variables } }
}

export function variablesDelete(name: string) {
  return { action: ACTIONS.VARIABLES_DELETE, params: { name } }
}

export function reachMarker(blockId: number, name: string) {
  return { action: ACTIONS.REACH_MARKER, params: { blockId, name } }
}

export function auth(appID: string, key: string) {
  return { action: ACTIONS.AUTH, appID, key }
}

export function makeCall(params: any = {}) {
  return { action: ACTIONS.MAKE_CALL, ...params }
}

export function hangup(reason: any) {
  return {
    action: ACTIONS.HANGUP,
    params: {
      reason: reason,
    },
  }
}

export function answer() {
  return { action: ACTIONS.ANSWER }
}

export function ring() {
  return { action: ACTIONS.RING }
}

export function stopDelivery(params: any = {}) {
  return { action: ACTIONS.STOP_DELIVERY, params }
}

export function stopTry() {
  return { action: ACTIONS.STOP_TRY }
}

export function startCall(params: any = {}) {
  return { action: ACTIONS.START_CALL, params }
}

export function finishCall(params: any = {}) {
  return { action: ACTIONS.FINISH_CALL, params }
}

export function pong() {
  return { action: ACTIONS.PONG }
}

export function startAudioStream() {
  return { action: ACTIONS.START_AUDIO_STREAM }
}

export function stopAudioStream() {
  return { action: ACTIONS.STOP_AUDIO_STREAM }
}

export function forwardAudioStream(host: string, port: number | string) {
  return {
    action: ACTIONS.FORWARAD_AUDIO_STREAM,
    params: { host, port },
  }
}

export function sendSms(to: string, text: string, digital: any, short: any, from: string, id?: string | number) {
  return { action: ACTIONS.SEND_SMS, to, text, from, digital, short, id: id || uuid() }
}

export function callForward(to: string, message: string, tts: any, headers = null) {
  return {
    action: ACTIONS.CALL_FORWARD,
    params: { to, message, tts, headers },
  }
}

export function startBackgroundSound(url: string, volume: any, repeat: any) {
  return {
    action: ACTIONS.START_BACKGROUND_SOUND,
    params: {
      url,
      repeat,
      volume,
    },
  }
}

export function cacheTTS(phrases: any) {
  return {
    action: ACTIONS.CACHE_TTS,
    params: {
      phrases: phrases,
    },
  }
}

export function stopBackgroundSound() {
  return { action: ACTIONS.STOP_BACKGROUND_SOUND }
}

export function startAudioRecord(recordingID: string | number, format: any) {
  return {
    action: ACTIONS.START_AUDIO_RECORD,
    params: {
      format,
      recordingID,
    },
  }
}

export function stopAudioRecord(recordingID: string | number) {
  return {
    action: ACTIONS.STOP_AUDIO_RECORD,
    params: {
      recordingID,
    },
  }
}

export function ttsAction(playbackID: string | number, text: string, params: any = {}, ssml: any) {
  return {
    action: ACTIONS.TTS_ACTION,
    params: Object.assign({
      text,
      ssml,
      playbackID,
      ...params,
    }),
  }
}

export function playbackAction(playbackID: string | number, url: string) {
  return {
    action: ACTIONS.PLAYBACK_ACTION,
    params: { url, playbackID },
  }
}

export function playbackFile(playbackID: string | number, fileHash: any, fileType: string) {
  return {
    action: ACTIONS.PLAYBACK_FILE,
    params: { fileHash, fileType, playbackID },
  }
}

export function fileResponse(playbackID: string | number, fileData: string, fileType: string) {
  return {
    action: ACTIONS.FILE_RESPONSE,
    params: { fileData, fileType, playbackID },
  }
}

export function stopPlayback(playbackID: string | number) {
  return {
    action: ACTIONS.STOP_PLAYBACK,
    params: {
      playbackID,
    },
  }
}

export function startSpeechRecognition(
  sessionID: string | number,
  provider: any,
  language: any,
  grammar: any,
  timeout: any
) {
  return {
    action: ACTIONS.START_SPEECH_RECOGNITION,
    params: {
      provider,
      language,
      grammar,
      timeout,
      sessionID,
    },
  }
}

export function stopSpeechRecognition(sessionID: string | number) {
  return {
    action: ACTIONS.STOP_SPEECH_RECOGNITION,
    params: {
      sessionID,
    },
  }
}

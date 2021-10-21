import { v4 as uuid } from 'uuid'
import WebSocket from 'ws'
import EventEmitter from 'events'
import InfobotPlayback from './playback'
import InfobotRecording from './recording'
import InfobotRecognitionSession from './recognition'
import * as actions from './actions'
import { WS_EVENTS } from './events'
import InfobotVariables from './variables'

export default class InfobotCall extends EventEmitter {
  isConnected = false
  variables: InfobotVariables

  constructor(public id: string = uuid(), private ws: WebSocket, public params: any = {}) {
    super()
    this.setMaxListeners(200)
    this.variables = new InfobotVariables(this)
  }

  processEvent(event: string, data: any, receiveData = null) {
    this.emit(event, data)

    if (receiveData) {
      this.emit(WS_EVENTS.WS_RECEIVE, receiveData)
    }
  }

  send(data: any) {
    const dataWithCallID = { ...data, callID: this.id }
    this.emit(WS_EVENTS.WS_SEND, dataWithCallID)
    this.ws.send(JSON.stringify(dataWithCallID))
  }

  hangup(reason: any) {
    this.send(actions.hangup(reason))
  }

  answer() {
    this.isConnected = true
    this.send(actions.answer())
  }

  ring() {
    this.send(actions.ring())
  }

  stopDelivery() {
    this.send(actions.stopDelivery())
  }

  stopTry() {
    this.send(actions.stopTry())
  }

  start() {
    this.send(actions.startCall())
  }

  finish() {
    this.send(actions.finishCall())
  }

  pong() {
    this.send(actions.pong())
  }

  startAudioStream() {
    this.send(actions.startAudioStream())
  }

  stopAudioStream() {
    this.send(actions.stopAudioStream())
  }

  forwardAudioStream(host: string, port: number | string) {
    this.send(actions.forwardAudioStream(host, port))
  }

  sendSMS(to: string, text: string, digital: any, short: any, from: string) {
    this.send(actions.sendSms(to, text, digital ? 1 : 0, short ? 1 : 0, from))
  }

  forward(to: string, message: string, tts: any, headers = null) {
    this.send(actions.callForward(to, message, tts, headers))
  }

  startBackgroundSound(url: string, volume: any, repeat: any) {
    this.send(actions.startBackgroundSound(url, volume, repeat))
  }

  cacheTTS(phrases: any) {
    this.send(actions.cacheTTS(phrases))
  }

  stopBackgroundSound() {
    this.send(actions.stopBackgroundSound())
  }

  say(text: string, params: any, ssml: any): InfobotPlayback {
    const playback = new InfobotPlayback(this)
    playback.say(text, params, ssml)
    return playback
  }

  playURL(url: string): InfobotPlayback {
    const playback = new InfobotPlayback(this)
    playback.playURL(url)
    return playback
  }

  playFile(path: string): InfobotPlayback {
    const playback = new InfobotPlayback(this)
    playback.playFile(path)
    return playback
  }

  startSpeechRecognition({ provider, language, grammar, timeout }): InfobotRecognitionSession {
    const recognitionSession = new InfobotRecognitionSession(this)
    recognitionSession.startSpeechRecognition(provider, language, grammar, timeout)
    return recognitionSession
  }

  stopSpeechRecognition(): InfobotRecognitionSession {
    const recognitionSession = new InfobotRecognitionSession(this)
    recognitionSession.stopSpeechRecognition()
    return recognitionSession
  }

  startAudioRecord(format: any): InfobotRecording {
    const recording = new InfobotRecording(this)
    recording.startRecording(format)
    return recording
  }

  reachMarker(blockId: number, name: string) {
    this.send(actions.reachMarker(blockId, name))
  }
}

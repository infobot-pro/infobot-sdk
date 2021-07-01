import EventEmitter from 'events'
import { v1 as uuid } from 'uuid'
import { startAudioRecord, stopAudioRecord } from './actions'
import InfobotCall from './call'
import { APP_EVENTS, WS_CALL_EVENTS } from './events'
import { WsMessage } from './types'

export default class InfobotRecording extends EventEmitter {
  id: string = uuid()

  constructor(private call: InfobotCall) {
    super()
    this.setMaxListeners(200)
    this.initEventHandlers()
  }

  private initEventHandlers() {
    this.call.on(WS_CALL_EVENTS.RECORDING_COMPLETE, (message: WsMessage) => {
      if (message.recordingID !== this.id) return
      this.emit(APP_EVENTS.RECORDING_COMPLETE, message)
    })

    this.call.on(WS_CALL_EVENTS.RECORDING_FAILED, (message: WsMessage) => {
      if (message.recordingID !== this.id) return
      this.emit(APP_EVENTS.RECORDING_FAILED, message)
    })

    this.call.on(WS_CALL_EVENTS.RECORDING_SESSION_NOT_FOUND, (message: WsMessage) => {
      if (message.recordingID !== this.id) return
      this.emit(APP_EVENTS.RECORDING_SESSION_NOT_FOUND, message)
    })

    this.call.on(WS_CALL_EVENTS.BOT_ERROR, function (message: WsMessage) {
      if (message.recordingID !== this.id) return
      this.emit(APP_EVENTS.BOT_ERROR, message)
    })
  }

  startRecording(format: any) {
    this.call.send(startAudioRecord(this.id, format))
    return this
  }

  stopRecording() {
    this.call.send(stopAudioRecord(this.id))
    return this
  }
}

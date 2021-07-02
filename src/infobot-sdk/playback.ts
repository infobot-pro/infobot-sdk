import fs from 'fs'
import md5 from 'md5'
import mime from 'mime'
import { v1 as uuid } from 'uuid'
import EventEmitter from 'events'
import InfobotCall from './call'
import { APP_EVENTS, WS_CALL_EVENTS, WS_EVENTS } from './events'
import * as actions from './actions'
import { WsMessage } from './types'

export default class InfobotPlayback extends EventEmitter {
  id: string = uuid()

  constructor(public call: InfobotCall) {
    super()
    this.setMaxListeners(200)
    this.initEventHandlders()
  }

  private initEventHandlders() {
    this.call.on(WS_CALL_EVENTS.CALL_DISCONNECTED, (message: WsMessage) => {
      if (this.call.id !== message.callID) return
      this.emit(APP_EVENTS.CALL_DISCONNECTED, message)
    })

    this.call.on(WS_CALL_EVENTS.PLAYBACK_FINISHED, (message: WsMessage) => {
      if (message.playbackID !== this.id) return
      this.emit(APP_EVENTS.PLAYBACK_FINISHED, message)
    })

    this.call.on(WS_CALL_EVENTS.BOT_ERROR, (message: WsMessage) => {
      if (message.playbackID !== this.id) return
      this.emit(APP_EVENTS.BOT_ERROR, message)
    })
  }

  say(text: any, params: any, ssml: any) {
    this.call.send(actions.ttsAction(this.id, text, params, ssml))
    return this
  }

  playURL(url: string) {
    this.call.send(actions.playbackAction(this.id, url))
    return this
  }

  playFile(path: string) {
    const file = fs.readFileSync(path)
    const fileHash = md5(file)
    const fileType = mime.getType(path)

    const processFileRequest = (requestFileHash: any) => {
      if (fileHash !== requestFileHash) return false
      const fileData = file.toString('base64')
      this.call.send(actions.fileResponse(this.id, fileData, fileType))
    }

    this.call.send(actions.playbackFile(this.id, fileHash, fileType))
    this.call.on(WS_EVENTS.FILE_REQUEST, processFileRequest)

    setTimeout(() => {
      this.call.off(WS_EVENTS.FILE_REQUEST, processFileRequest)
    }, 20000)

    return this
  }

  stop() {
    this.call.send(actions.stopPlayback(this.id))
    return this
  }
}

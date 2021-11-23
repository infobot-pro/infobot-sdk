import EventEmitter from 'events'
import { variablesSet, variablesDelete, variablesGet } from './actions'
import InfobotCall from './call'
import { APP_EVENTS, WS_CALL_EVENTS } from './events'
import { Variable, WsMessage } from './types'

export default class InfobotVariables extends EventEmitter {
  //id: string = uuid()
  vars: Array<Variable> = []

  constructor(private call: InfobotCall) {
    super()
    this.setMaxListeners(200)
    this.initEventHandlers()
  }

  private initEventHandlers() {
    this.call.on(WS_CALL_EVENTS.VARIABLES_SET, (message: WsMessage) => {
      if (message.callID !== this.call.id) return
      this.vars = message.params.variables
      this.call.emit(APP_EVENTS.VARIABLES_SET, message)
    })

    this.call.on(WS_CALL_EVENTS.VARIABLES_GET, (message: WsMessage) => {
      if (message.callID !== this.call.id) return
      this.vars = message.params.variables
      this.call.emit(APP_EVENTS.VARIABLES_GET, message)
    })

    this.call.on(WS_CALL_EVENTS.VARIABLES_DELETE, (message: WsMessage) => {
      if (message.callID !== this.call.id) return
      this.vars = message.params.variables
      this.call.emit(APP_EVENTS.VARIABLES_DELETE, message)
    })
  }

  set(variables: Array<Variable>) {
    this.call.send(variablesSet(variables))
  }

  delete(name: string) {
    this.call.send(variablesDelete(name))
  }

  get() {
    this.call.send(variablesGet())
  }
}

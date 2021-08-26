export interface InfobotConfig {
  appId: string
  url: string
  key: string
  disableReconnect?: boolean
}

export interface WsMessage {
  event?: string
  callID?: string
  params?: any
  playbackID?: string
  recordingID?: string
  sessionID?: string
}

export interface Variable {
  value: string
  key: string
}

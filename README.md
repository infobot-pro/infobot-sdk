# InfobotSDK

Установите пакет указав `github` репозиторий:

```sh
npm i https://github.com/infobot-pro/infobot-sdk
```

## Примеры использования

Инициализируем `InfobotSDK` с вашими настройками конфигурации.

```ts
import { InfobotSDK } from 'infobot-sdk'

const infobotConfig = {
  appId: 'ВАШ_APP_ID',
  url: 'ВАШ_url',
  key: 'ВАШ_key',
}

const infobot = new InfobotSDK(infobotConfig)
```

Создаем обработчики

```ts
function handleIncomingCall(call) {
  call.ring()
  call.answer()
  // call.say()
}
```

Устанавливаем обработчики

```ts
infobot.on('authFailed', () => {
  throw new Error('Authentication failed')
})

infobot.on('connected', () => {
  infobot.on('incomingCall', handleIncomingCall)
})
```

Запускаем сервис

```ts
infobot.start()
```

## API

### InfobotConfig

Параметры конфигурации

```ts
interface InfobotConfig {
  appId: string
  url: string
  key: string
  disableReconnect?: boolean
}
```

### InfobotSDK

**Методы**

- `.start` - подключение к серверу инфобот
- `.on(eventName)` - установка обработчика событий инфобота
- `.off`, `.once`, `.removeAllEventListeners` - и другие методы унаследованы [`EventEmitter`](https://nodejs.org/api/events.html)

**События**

- `callAnswered`
- `incomingCall` - `(call: InfobotCall) => {}`
- `voicemail`
- `callFinished`
- `beforeCall`
- `callNoAnswer`
- `callFailed`
- `callBusy`
- `callIncorrectNumber`

### InfobotCall

**Методы**

- `.on(eventName)` - установка обработчика событий звонка
- `.off`, `.once`, `.removeAllEventListeners` - и другие методы унаследованы [`EventEmitter`](https://nodejs.org/api/events.html)
- `.hangup(reason)`
- `.answer()`
- `.ring()`
- `.stopDelivery()`
- `.stopTry()`
- `.start()`
- `.finish()`
- `.startAudioStream()`
- `.stopAudioStream()`
- `.forwardAudioStream(host, port)`
- `.sendSMS(to, text, digital, short, from)`
- `.forward(to, message, headers)`
- `.startBackgroundSound(url, volume, repeat)`
- `.cacheTTS(phrases)`
- `.stopBackgroundSound()`
- `.say(text, param, ssml): InfobotPlayback`
- `.playURL(url): InfobotPlayback`
- `.playFile(path): InfobotPlayback`
- `.startSpeechRecognition({ provider, language, grammar, timeout }): InfobotRecognitionSession`
- `.stopSpeechRecognition(): InfobotRecognitionSession`
- `.startAudioRecord(format): InfobotRecording`

### InfobotPlayback

**Методы**

- `.on(eventName)` - установка обработчика событий звонка
- `.off`, `.once`, `.removeAllEventListeners` - и другие методы унаследованы [`EventEmitter`](https://nodejs.org/api/events.html)
- `.say(text, param, ssml): InfobotPlayback`
- `.playURL(url): InfobotPlayback`
- `.playFile(path): InfobotPlayback`
- `.stop()`

**События**

- `call-disconnected`
- `playbackFinished`
- `botError`

### InfobotRecording

**Методы**

- `.on(eventName)` - установка обработчика событий звонка
- `.off`, `.once`, `.removeAllEventListeners` - и другие методы унаследованы [`EventEmitter`](https://nodejs.org/api/events.html)
- `.stopRecording()`

**События**

- `recordingComplete`
- `recordingSessionNotFound`

### InfobotRecognitionSession

**Методы**

- `.on(eventName)` - установка обработчика событий звонка
- `.off`, `.once`, `.removeAllEventListeners` - и другие методы унаследованы [`EventEmitter`](https://nodejs.org/api/events.html)
- `startSpeechRecognition(provider, language, grammar, timeout)`
- `stopSpeechRecognition()`

**События**

- `transcribe`
- `speech-recognition-timeout`

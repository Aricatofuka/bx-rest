import { iBXRestYesNo } from '../../../base/yes-no'
import { iBXRestImDialogGetParam } from '../get'

export interface iBXRestImDialogMessagesGetParam extends iBXRestImDialogGetParam {
  /**  Идентификатор последнего загруженного сообщения */
  LAST_ID?: number

  /** Идентификатор первого загруженного сообщения */
  FIRST_ID?: number

  /** Ограничение на выборку сообщений в диалоге */
  LIMIT?: number
}

export type iBXRestImDialogMessagesGet = iBXRestImDialogMessagesGetBase<iBXRestImDialogMessagesGetMessage>

export type iBXRestImDialogMessagesGetHttp = iBXRestImDialogMessagesGetBase<iBXRestImDialogMessagesGetMessageHttp>

export interface iBXRestImDialogMessagesGetBase<message = iBXRestImDialogMessagesGetMessageBase> {
  /** массив сообщений */
  messages: message[]
  /** обьекты описания данных пользователя */
  users: iBXRestImDialogMessagesGetUser[]
  /** обьект, описывающий файлы в выбранных сообщениях */
  files: iBXRestImDialogMessagesGetChatFile[]
  /** идентификатор чата */
  chat_id: number
}

export interface iBXRestImDialogMessagesGetMessage extends iBXRestImDialogMessagesGetBase {
  /** Дата сообщения */
  date: Date

  /** Параметры сообщения (может быть null) */
  params: iBXRestImDialogMessagesGetMessageParams | null
}

export interface iBXRestImDialogMessagesGetMessageHttp extends iBXRestImDialogMessagesGetBase {
  /** Дата сообщения в формате ATOM */
  date: string

  /** Параметры сообщения (может быть null) */
  params: iBXRestImDialogMessagesGetMessageParamsHttp | null
}

export interface iBXRestImDialogMessagesGetMessageBase {
  /** Идентификатор сообщения */
  id: number

  /** Идентификатор чата */
  chat_id: number

  /** Автор сообщения (0 — системное сообщение) */
  author_id: number

  /** Текст сообщения */
  text: string

  /** Параметры сообщения (может быть null) */
  params: iBXRestImDialogMessagesGetBase | null
}

export interface iBXRestImDialogMessagesGetMessageParams extends iBXRestImDialogMessagesGetMessageParamsBase {
  /** Признак того, что сообщение содержит только ссылку */
  URL_ONLY?: boolean

  /** Признак отредактированного сообщения */
  IS_EDITED?: boolean

  /** Признак удаленного сообщения */
  IS_DELETED?: boolean
}

export interface iBXRestImDialogMessagesGetMessageParamsHttp extends iBXRestImDialogMessagesGetMessageParamsBase {
  /** Признак того, что сообщение содержит только ссылку */
  URL_ONLY?: iBXRestYesNo

  /** Признак отредактированного сообщения */
  IS_EDITED?: iBXRestYesNo

  /** Признак удаленного сообщения */
  IS_DELETED?: iBXRestYesNo
}

export interface iBXRestImDialogMessagesGetMessageParamsBase {
  /** Массив идентификаторов URL */
  URL_ID?: number[]

  /** Массив идентификаторов прикрепленных файлов */
  FILE_ID?: number[]

  /** Массив пользователей, поставивших "лайк" */
  LIKE?: number[]

  /** Массив блоков расширенного оформления */
  ATTACH?: iBXRestImDialogMessagesGetMessageParamsAttachment[]

  /** Объект клавиатуры (опционально) */
  KEYBOARD?: any // TODO: уточнить при наличии примера
}

interface iBXRestImDialogMessagesGetMessageParamsAttachment {
  ID: string
  COLOR: string
  BLOCKS: iBXRestImDialogMessagesGetMessageParamsAttachmentBlock[]
}

interface iBXRestImDialogMessagesGetMessageParamsAttachmentBlock {
  RICH_LINK?: iBXRestImDialogMessagesGetMessageParamsAttachmentRichLink[]
}

interface iBXRestImDialogMessagesGetMessageParamsAttachmentRichLink {
  /** Название ссылки */
  NAME: string

  /** URL ссылки */
  LINK: string

  /** Описание ссылки */
  DESC: string

  /** URL изображения-превью */
  PREVIEW: string
}

interface iBXRestImDialogMessagesGetUser {
  /** Идентификатор пользователя */
  id: number

  /** Имя и фамилия */
  name: string

  /** Имя */
  first_name: string

  /** Фамилия */
  last_name: string

  /** Должность */
  work_position: string

  /** Цвет (в HEX) */
  color: string

  /** Ссылка на аватар (может быть пустой строкой) */
  avatar: string

  /** Пол: "M" или "F" */
  gender: string

  /** День рождения в формате DD-MM или пустая строка */
  birthday: string

  /** Признак экстранет-пользователя */
  extranet: boolean

  /** Признак Bitrix24.Network-пользователя */
  network: boolean

  /** Признак бота */
  bot: boolean

  /** Признак открытых линий */
  connector: boolean

  /** Код внешней авторизации */
  external_auth_id: string

  /** Статус пользователя (например, "online") */
  status: string

  /** Время ухода от компьютера или false */
  idle: string | false

  /** Дата последней активности или false */
  last_activity_date: string | false

  /** Дата активности в мобильном приложении или false */
  mobile_last_date: string | false

  /** Дата окончания отпуска или false */
  absent: string | false

  /** Подразделения */
  departments: number[]

  /** Телефоны или false */
  phones: iBXRestImDialogMessagesGetUserPhones | false
}

interface iBXRestImDialogMessagesGetUserPhones {
  /** Рабочий телефон */
  work_phone?: string

  /** Мобильный телефон */
  personal_mobile?: string

  /** Домашний телефон */
  personal_phone?: string
}

// ==== Файлы ====
interface iBXRestImDialogMessagesGetChatFile {
  /** Идентификатор файла */
  id: number

  /** Идентификатор чата */
  chatId: number

  /** Дата добавления */
  date: string

  /** Тип: "image" или "file" */
  type: 'image' | 'file'

  /** Имя файла */
  name: string

  /** Размер файла в байтах */
  size: number

  /** Превью (может быть пустым) */
  preview: string

  /** Размер изображения, если применимо */
  image?: {
    width: number
    height: number
  }

  /** Статус загрузки */
  status: 'done' | 'upload'

  /** Прогресс загрузки: 0–100, -1 если неизвестен */
  progress: number

  /** Идентификатор автора */
  authorId: number

  /** Имя автора */
  authorName: string

  /** Ссылка на предпросмотр (только для изображений) */
  urlPreview?: string

  /** Ссылка на просмотр */
  urlShow: string

  /** Ссылка на скачивание */
  urlDownload: string
}

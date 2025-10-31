import { iBXRestYesNo } from '../../../base/yes-no'

export interface iBXRestImDialogRecentListParam {
  /**
   * Пропускать чаты открытых линий
   */
  SKIP_OPENLINES?: iBXRestYesNo

  /** Пропускать диалоги "один на один" */
  SKIP_DIALOG?: iBXRestYesNo

  /** Пропускать чатын */
  SKIP_CHAT?: iBXRestYesNo

  /** Дата из последнего элемента предыдущей выборки */
  LAST_MESSAGE_DATE?: Date
}


// Объект аватара пользователя или чата
interface iBXRestImDialogRecentListAvatar {
  /** Ссылка на аватар (если пусто — аватар не задан) */
  url: string
  /** Цвет диалога в формате hex */
  color: string
}

// Объект последнего сообщения
export interface iBXRestImDialogRecentListMessage extends iBXRestImDialogRecentListMessageBase {
  /** Дата сообщения */
  date: Date
}

// Объект последнего сообщения
export interface iBXRestImDialogRecentListMessageHttp extends iBXRestImDialogRecentListMessageBase {
  /** Дата сообщения */
  date: string
}

// Объект последнего сообщения
export interface iBXRestImDialogRecentListMessageBase {
  /** Идентификатор сообщения */
  id: number
  /** Текст сообщения без BB-кодов и переносов строк */
  text: string
  /** Признак наличия файлов */
  file: boolean
  /** Признак наличия вложений */
  attach: boolean
  /** Идентификатор автора */
  author_id: number
  /** Статус сообщения (например, "received") */
  status: string
}

export interface iBXRestImDialogRecentListUserData extends iBXRestImDialogRecentListUserDataBase {
  birthday?: Date | false
  last_activity_date?: Date
  mobile_last_date?: Date | false
}

export interface iBXRestImDialogRecentListUserDataHttp extends iBXRestImDialogRecentListUserDataBase {
  birthday?: string | false
  last_activity_date?: string
  mobile_last_date?: string | false
}

// Объект пользователя (если type === 'user')
export interface iBXRestImDialogRecentListUserDataBase {
  /** Идентификатор пользователя */
  id: number
  name?: string
  first_name?: string
  last_name?: string
  work_position?: string
  color?: string
  avatar?: string
  gender?: string
  extranet?: boolean
  network?: boolean
  bot?: boolean
  connector?: boolean
  external_auth_id?: string
  status?: string
  idle?: string | false
  absent?: string | false
}

// Объект чата (если type === 'chat')
export interface iBXRestImDialogRecentListChatData extends iBXRestImDialogRecentListChatDataBase {
  /** Дата создания чата */
  date_create: Date
}

// Объект чата (если type === 'chat')
export interface iBXRestImDialogRecentListChatDataHttp extends iBXRestImDialogRecentListChatDataBase {
  /** Дата создания чата */
  date_create: string
}

// Объект чата (если type === 'chat')
export interface iBXRestImDialogRecentListChatDataBase {
  /** Идентификатор чата */
  id: number
  /** Название чата */
  name: string
  /** Владелец чата */
  owner: number
  /** Признак участия внешнего пользователя */
  extranet: boolean
  /** Ссылка на аватар чата */
  avatar: string
  /** Цвет чата */
  color: string
  /** Тип чата (например, 'chat', 'lines', ...) */
  type: string
  /** Внешний тип чата */
  entity_type: string
  /** Внешний идентификатор чата */
  entity_id: string
  /** Внешние данные для чата (часто технические строки) */
  entity_data_1: string
  entity_data_2: string
  entity_data_3: string
  /** Список заглушенных пользователей (может быть пустым) */
  mute_list: number[]
  /** Список менеджеров чата */
  manager_list: number[]
  /** Тип сообщений в чате */
  message_type: string
}

// Объект данных открытой линии
export interface iBXRestImDialogRecentListLinesData extends iBXRestImDialogRecentListLinesDataBase {
  /** Дата создания */
  date_create: Date
}

// Объект данных открытой линии
export interface iBXRestImDialogRecentListLinesDataHttp extends iBXRestImDialogRecentListLinesDataBase {
  /** Дата создания */
  date_create: string
}

// Объект данных открытой линии
export interface iBXRestImDialogRecentListLinesDataBase {
  /** Идентификатор открытой линии */
  id: number
  /** Статус линии */
  status: number
}


export interface iBXRestImDialogRecentListChatListItem extends iBXRestImDialogRecentListChatListItemBase {
  /** Уникальный идентификатор (строка chatXXX или число) */
  id: number
  /** Дата последнего обновления чата */
  date_update: Date
  /** Информация об открытой линии */
  lines?: iBXRestImDialogRecentListLinesData
  /** Последнее сообщение */
  message: iBXRestImDialogRecentListMessage
  /** Информация о чате, если доступна */
  chat?: iBXRestImDialogRecentListChatData
  /** Информация о пользователе */
  user?: iBXRestImDialogRecentListUserData
}


export interface iBXRestImDialogRecentListChatListItemHttp extends iBXRestImDialogRecentListChatListItemBase {
  /** Уникальный идентификатор (строка chatXXX или число) */
  id: string
  /** Дата последнего обновления чата */
  date_update: string
  /** Информация об открытой линии */
  lines?: iBXRestImDialogRecentListLinesDataHttp
  /** Последнее сообщение */
  message: iBXRestImDialogRecentListMessageHttp
  /** Информация о чате, если доступна */
  chat?: iBXRestImDialogRecentListChatDataHttp
  /** Информация о пользователе */
  user?: iBXRestImDialogRecentListUserDataHttp

}

// Отдельный элемент в списке чатов/пользователей
export interface iBXRestImDialogRecentListChatListItemBase {
  /** Идентификатор чата (если применимо) */
  chat_id?: number
  /** Тип: 'user' или 'chat' */
  type: 'user' | 'chat'
  /** Объект аватара */
  avatar: iBXRestImDialogRecentListAvatar
  /** Заголовок (имя пользователя или название чата) */
  title: string
  /** Последнее сообщение */
  message: iBXRestImDialogRecentListMessageBase
  /** Количество непрочитанных сообщений */
  counter: number
  /** Признак закрепленного чата */
  pinned: boolean
  /** Признак непрочитанного чата */
  unread: boolean
  /** Информация о чате, если доступна */
  chat?: iBXRestImDialogRecentListChatDataBase
  /** Информация об открытой линии */
  lines?: iBXRestImDialogRecentListLinesDataBase
  /** Информация о пользователе */
  user?: iBXRestImDialogRecentListUserDataBase
  /** Дополнительные опции (пока не описаны) */
  options: any[]
}

// Общий формат ответа API
export interface iBXRestImDialogRecentList extends iBXRestImDialogRecentListBase {
  items: iBXRestImDialogRecentListChatListItem[]
}

// Общий формат ответа API
export interface iBXRestImDialogRecentListHttp extends iBXRestImDialogRecentListBase {
  items: iBXRestImDialogRecentListChatListItemHttp[]
}

// Общий формат ответа API
export interface iBXRestImDialogRecentListBase {
  items: iBXRestImDialogRecentListChatListItemBase[]
}

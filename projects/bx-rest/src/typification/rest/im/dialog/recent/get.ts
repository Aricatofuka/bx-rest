import { iBXRestYesNo } from '../../../base/yes-no'

export interface iBXRestImDialogRecentGetParam {
  /**
   * Пропускать чаты открытых линий
   */
  SKIP_OPENLINES?: iBXRestYesNo

  /** Пропускать чаты */
  SKIP_CHAT?: iBXRestYesNo

  /** Пропускать диалоги один-на-один */
  SKIP_DIALOG?: iBXRestYesNo

  /**
   * Ограничение выборки для минимизации переданных данных.
   */
  LAST_UPDATE?: Date

  /**
   * Выборка только чатов открытых линий
   */
  ONLY_OPENLINES?: iBXRestYesNo

  /**
   * Дата предыдущей выборки для загрузки изменений, произошедших в списке с этого времени.
   * Выборка возвращает данные не старше 7 дней.
   */
  LAST_SYNC_DATE?: Date
}


// Описание аватара пользователя или чата
export interface iBXRestImDialogRecentGetAvatar {
  /** Ссылка на аватар (если пусто — аватар не задан) */
  url: string
  /** Цвет диалога в формате hex */
  color: string
}

// Описание последнего сообщения
export interface iBXRestImDialogRecentGetMessage {
  /** Идентификатор сообщения */
  id: string
  /** Текст сообщения (без BB-кодов и переносов строк) */
  text: string
  /** Признак наличия файлов */
  file: boolean
  /** Признак наличия вложений */
  attach: boolean
  /** Идентификатор автора сообщения */
  author_id: string
}

export interface iBXRestImDialogRecentGetUserData extends iBXRestImDialogRecentGetUserDataBase{
  /** Идентификатор пользователя */
  id: number
  /** Дата последнего действия пользователя */
  last_activity_date: Date | false
  /** Дата последней активности в мобильном приложении или false */
  mobile_last_date: Date | false
  /** Дата окончания отпуска или false */
  absent: Date | false
}

export interface iBXRestImDialogRecentGetUserDataHttp extends iBXRestImDialogRecentGetUserDataBase{
  /** Идентификатор пользователя */
  id: string
  /** Дата последнего действия пользователя */
  last_activity_date: string
  /** Дата последней активности в мобильном приложении или false */
  mobile_last_date: string | false
  /** Дата окончания отпуска или false */
  absent: string | false
}

export interface iBXRestImDialogRecentGetUserDataBase {
  /** Полное имя (имя и фамилия) */
  name: string
  /** Имя пользователя */
  first_name: string
  /** Фамилия пользователя */
  last_name: string
  /** Должность пользователя */
  work_position: string
  /** Цвет в формате hex */
  color: string
  /** Ссылка на аватар */
  avatar: string
  /** Пол пользователя (M/F) */
  gender: string
  /** День рождения в формате DD-MM или false */
  birthday: string | false
  /** Внешний экстранет-пользователь */
  extranet: boolean
  /** Пользователь Битрикс24.Network */
  network: boolean
  /** Бот */
  bot: boolean
  /** Пользователь открытых линий */
  connector: boolean
  /** Код внешней авторизации */
  external_auth_id: string
  /** Статус пользователя (например, online) */
  status: string
  /** Дата, когда пользователь отошел от компьютера, или false */
  idle: string | false
}

export interface iBXRestImDialogRecentGetChatChatData extends iBXRestImDialogRecentGetChatChatDataBase{
  /** Идентификатор чата */
  id: number
  /** Дата создания чата */
  date_create: Date
}

export interface iBXRestImDialogRecentGetChatChatDataHttp extends iBXRestImDialogRecentGetChatChatDataBase{
  /** Идентификатор чата */
  id: string
  /** Дата создания чата */
  date_create: string
}

export type iBXRestImDialogRecentGetChatDataBase = iBXRestImDialogRecentGetChatChatDataBase | iBXRestImDialogRecentGetChatUserDataBase

export interface iBXRestImDialogRecentGetChatChatDataBase {
  background_id: null // TODO: найти что тут может кроме null стоять
  text_field_enabled: true
}

export interface iBXRestImDialogRecentGetChatUserDataBase {
  /** Название чата */
  title: string
  /** Идентификатор владельца чата */
  owner: string
  /** Признак участия внешнего пользователя */
  extranet: boolean
  /** Ссылка на аватар чата */
  avatar: string
  /** Цвет чата */
  color: string
  /** Тип чата (chat, openline и т.д.) */
  type: string
  /** Внешний код чата — тип */
  entity_type: string
  /** Внешний код чата — идентификатор (может отсутствовать) */
  entity_id?: string
  /** Внешние данные для чата (1) */
  entity_data_1: string
  /** Внешние данные для чата (2) */
  entity_data_2: string
  /** Внешние данные для чата (3) */
  entity_data_3: string
  /** Тип сообщений в чате (обычно "C") */
  message_type: string
}

export interface iBXRestImDialogRecentGet extends iBXRestImDialogRecentGetBase{
  /** Дата последнего сообщения */
  date_update: Date
  /** Объект пользователя, если type === 'user' */
  user?: iBXRestImDialogRecentGetUserData
  /** Объект чата, если type === 'chat' */
  chat?: iBXRestImDialogRecentGetChatChatData | iBXRestImDialogRecentGetChatUserDataBase
}

export interface iBXRestImDialogRecentGetHttp extends iBXRestImDialogRecentGetBase{
  /** Дата последнего сообщения */
  date_update: string
  /**
   * Объект пользователя, если type === 'user'
   * Посмотреть бы в глаза тому человеку, что эту хуету сделала, ну тип {id: 0} это ахуй
   */
  user?: iBXRestImDialogRecentGetUserDataHttp | {id: 0}
  /** Объект чата, если type === 'chat' */
  chat?: iBXRestImDialogRecentGetChatChatDataHttp | iBXRestImDialogRecentGetChatUserDataBase
}

// Универсальная запись в списке (пользователь или чат)
export interface iBXRestImDialogRecentGetBase {
  /** Идентификатор записи: число для пользователя, строка "chatXXX" для чата */
  id: string | number
  /** Количество непрочитанных сообщений */
  counter: number
  /** Тип записи: 'user' или 'chat' */
  type: 'user' | 'chat'
  /** Объект аватара */
  avatar: iBXRestImDialogRecentGetAvatar
  /** Заголовок: имя пользователя или название чата */
  title: string
  /** Последнее сообщение */
  message: iBXRestImDialogRecentGetMessage
  /** Объект пользователя, если type === 'user' */
  user?: iBXRestImDialogRecentGetUserDataBase | {id: 0}
}

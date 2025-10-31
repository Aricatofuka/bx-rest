import { iBXRestYesNo } from '../../../base/yes-no'
import { iBXRestImDialogGetParam } from '../get'

export interface iBXRestImDialogUserGetParam extends iBXRestImDialogGetParam {
  /**
   * Пропустить всех системных пользователей - 'Y'|'N' (по умолчанию 'N')
   */
  SKIP_EXTERNAL: iBXRestYesNo
  /**
   * Строка с теми типами системных пользователей, которых нужно оставить в выборке
   */
  SKIP_EXTERNAL_EXCEPT_TYPES: string
}

export interface iBXRestImDialogUserGet extends iBXRestImDialogUserGetBase {
  last_activity_date: Date
  mobile_last_date: Date | false
}

export interface iBXRestImDialogUserGetHttp extends iBXRestImDialogUserGetBase {
  /** Дата последнего действия пользователя в формате ISO 8601 */
  last_activity_date: string

  /** Дата последнего действия в мобильном приложении в формате ISO 8601 или false */
  mobile_last_date: string | false
}

export interface iBXRestImDialogUserGetBase {
  /** Идентификатор пользователя */
  id: number

  /** Является ли пользователь активным (неуволенным) */
  active: boolean

  /** Имя и фамилия пользователя */
  name: string

  /** Имя пользователя */
  first_name: string

  /** Фамилия пользователя */
  last_name: string

  /** Должность */
  work_position: string

  /** Цвет пользователя в формате hex */
  color: string

  /** Ссылка на аватар (если пусто, значит, аватар не задан) */
  avatar: string

  /** Пол пользователя: "M" или "F" */
  gender: string

  /** День рождения пользователя в формате "DD-MM" (если не задан — пустая строка) */
  birthday: string

  /** Признак внешнего экстранет-пользователя */
  extranet: boolean

  /** Признак пользователя Битрикс24.Network */
  network: boolean

  /** Признак бота */
  bot: boolean

  /** Признак пользователя открытых линий */
  connector: boolean

  /** Код внешней авторизации */
  external_auth_id: string

  /** Выбранный статус пользователя (например, "online") */
  status: string

  /** Дата, когда пользователь отошел от компьютера, либо false */
  idle: string | false

  /** Дата окончания отпуска пользователя в формате ISO 8601 или false */
  absent: string | false

  /** Идентификаторы подразделений */
  departments: number[]

  /** Телефоны пользователя либо false, если не указаны */
  phones: false | {
    /** Рабочий телефон */
    work_phone?: string

    /** Мобильный телефон */
    personal_mobile?: string

    /** Домашний телефон */
    personal_phone?: string
  }
}

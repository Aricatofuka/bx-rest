import { iBXRestYesNo } from '../../base/yes-no'

export interface iBXRestImUserGetParam {
  ID: number
  AVATAR_HR: iBXRestYesNo
}

/** Объект с номерами телефонов пользователя */
export interface iBXRestImUserGetPhones {
  /** Рабочий телефон */
  work_phone: string
  /** Мобильный телефон */
  personal_mobile: string
  /** Домашний телефон */
  personal_phone: string
}

export interface iBXRestImUserGet extends iBXRestImUserGetBase {
  /** Дата последней активности пользователя */
  last_activity_date: Date
  /** Дата последней активности в мобильном приложении, либо false */
  mobile_last_date: Date | false
  /** Дата последней активности в десктопном приложении, либо false */
  desktop_last_date: Date | false
}

export interface iBXRestImUserGetHttp extends iBXRestImUserGetBase {
  /** Дата последней активности пользователя */
  last_activity_date: string
  /** Дата последней активности в мобильном приложении, либо false */
  mobile_last_date: string | false
  /** Дата последней активности в десктопном приложении, либо false */
  desktop_last_date: string | false
}

/** Основная информация о пользователе */
export interface iBXRestImUserGetBase {
  /** Уникальный идентификатор пользователя */
  id: number
  /** Полное имя пользователя (имя + фамилия) */
  name: string
  /** Имя пользователя */
  first_name: string
  /** Фамилия пользователя */
  last_name: string
  /** Должность пользователя */
  work_position: string
  /** Цвет пользователя в hex-формате */
  color: string
  /** Ссылка на аватар (может быть пустой) */
  avatar: string
  /** Пол пользователя: "M" или "F" */
  gender: string
  /** День рождения в формате DD-MM или пустая строка */
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
  /** Статус пользователя (например, "online") */
  status: string
  /** Дата, когда пользователь отошел от компьютера, либо false */
  idle: string | false
  /** Идентификаторы подразделений, к которым относится пользователь */
  departments: number[]
  /** Дата окончания отпуска, либо false */
  absent: string | false
  /** Объект с номерами телефонов */
  phones: iBXRestImUserGetPhones
  /** Ссылка на аватар высокого разрешения (только если запрашивается с AVATAR_HR = 'Y') */
  avatar_hr?: string
}
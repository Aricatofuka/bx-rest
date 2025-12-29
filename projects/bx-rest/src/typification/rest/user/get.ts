import { iBXRestYesNo } from '../base/yes-no'
import { iBXRestBaseParam } from '../support'
import { iBXRestOrderOption } from '../base/order-options'
import { iAllBXGender } from './user'


export interface iBXRestParamUserGet extends iBXRestBaseParam {
  // ID?: number[] | number // по ID так больше не делаем так как FILTER все перебивает к чертям собачим
  FILTER?: iBXRestParamUserGetFilter
  order?: iBXRestOrderOption
  ADMIN_MODE?: string
}


export interface iBXRestParamUserGetFilter {
  ID?: number[] | number
  PERSONAL_BIRTHDAY?: string | string[]
  /**
   * Принадлежность к структуре компании
   */
  UF_DEPARTMENT?: number[]
  /**
   * Внутренний телефонный номер
   */
  UF_PHONE_INNER?: string
  /**
   * Позволяет показать только авторизованных или нет пользователей
   */
  IS_ONLINE?: iBXRestYesNo
  /**
   * Быстрый поиск по персональным данны
   */
  NAME_SEARCH?: string
  /**
   * Тип пользователя. Может принимать следующие значения:
   * employee - сотрудник
   * extranet - пользователь экстранета
   * email - почтовый пользователь
   */
  USER_TYPE?: 'employee' | 'extranet' | 'email'
  /**
   * При значении true исключает из запроса уволенных пользователей.
   * False показывает только уволенных
   * Отсутствие указателя показывает и тех и других
   */
  ACTIVE?: boolean | null
  EMAIL?: string
  NAME?: string
  LAST_NAME?: string
  SECOND_NAME?: string
  PERSONAL_GENDER?: iAllBXGender
  PERSONAL_PROFESSION?: string
  PERSONAL_WWW?: string
  PERSONAL_PHOTO?: string
  PERSONAL_ICQ?: string
  PERSONAL_PHONE?: string
  PERSONAL_FAX?: string
  PERSONAL_MOBILE?: string
  PERSONAL_PAGER?: string
  PERSONAL_STREET?: string
  PERSONAL_CITY?: string
  PERSONAL_STATE?: string
  PERSONAL_ZIP?: string
  PERSONAL_COUNTRY?: string
  TIME_ZONE?: string
  TIME_ZONE_OFFSET?: string
  WORK_COMPANY?: string
  WORK_POSITION?: string
  WORK_PHONE?: string
  UF_INTERESTS?: string
  UF_SKILLS?: string
  UF_WEB_SITES?: string
  UF_XING?: string
  UF_LINKEDIN?: string
  UF_FACEBOOK?: string
  UF_TWITTER?: string
  UF_SKYPE?: string
  UF_DISTRICT?: string
}

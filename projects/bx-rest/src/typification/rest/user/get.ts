import { iBXRestYesNo } from '../base/YesNo'
import { iBXRestBaseParam } from '../support/param'
import { iBXRestOrderOption } from '../base/OrderOptions'
import { iAllBXGender } from './user'


export interface iBXRestParamUserGet extends iBXRestBaseParam {
  // ID?: number[] | number, // по ID, так больше не делаем так как FILTER все перебивает к чертям собачим
  FILTER?: iBXRestParamUserGetFilter,
  order?: iBXRestOrderOption,
  ADMIN_MODE?: string
}


export interface iBXRestParamUserGetFilter {
  ID?: number[] | number,
  PERSONAL_BIRTHDAY?: string | string[]
  UF_DEPARTMENT?: number[],  // принадлежность к структуре компании
  UF_PHONE_INNER?: string, // внутренний телефонный номер
  IS_ONLINE?: iBXRestYesNo,  // позволяет показать только авторизованных или нет пользователей
  NAME_SEARCH?: string, // быстрый поиск по персональным данным
  USER_TYPE?: 'employee' | 'extranet' | 'email', // Тип пользователя. Может принимать следующие значения:
  // employee - сотрудник,
  // extranet - пользователь экстранета,
  // email - почтовый пользователь
  ACTIVE?: 2 | 1 | 0 // при значении 1 исключает из запроса уволенных пользователей. 2 - если нужны и те и те
  EMAIL?: string,
  NAME?: string,
  LAST_NAME?: string,
  SECOND_NAME?: string,
  PERSONAL_GENDER?: iAllBXGender,
  PERSONAL_PROFESSION?: string,
  PERSONAL_WWW?: string,
  PERSONAL_PHOTO?: string,
  PERSONAL_ICQ?: string,
  PERSONAL_PHONE?: string,
  PERSONAL_FAX?: string,
  PERSONAL_MOBILE?: string,
  PERSONAL_PAGER?: string,
  PERSONAL_STREET?: string,
  PERSONAL_CITY?: string,
  PERSONAL_STATE?: string,
  PERSONAL_ZIP?: string,
  PERSONAL_COUNTRY?: string,
  TIME_ZONE?: string,
  TIME_ZONE_OFFSET?: string,
  WORK_COMPANY?: string,
  WORK_POSITION?: string,
  WORK_PHONE?: string,
  UF_INTERESTS?: string,
  UF_SKILLS?: string,
  UF_WEB_SITES?: string,
  UF_XING?: string,
  UF_LINKEDIN?: string,
  UF_FACEBOOK?: string,
  UF_TWITTER?: string,
  UF_SKYPE?: string,
  UF_DISTRICT?: string,

}

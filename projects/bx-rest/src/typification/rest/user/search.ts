import { iBXRestPagination } from '../base/api-pagination-bx'
import { iBXRestYesNo } from '../base/yes-no'

export interface iBXRestParamUserSearch extends iBXRestPagination {
  /**
   * Имя
   */
  NAME?: string
  /**
   * Фамилия
   */
  LAST_NAME?: string
  /**
   * Отчество
   */
  SECOND_NAME?: string,
  /**
   * Должность
   */
  WORK_POSITION?: string,
  /**
   * Название подразделения
   */
  UF_DEPARTMENT_NAME?: string,
  USER_TYPE?: 'employee' | 'extranet' | 'email',
  /**
   * Поиск по всем выше перечисленным полям
   */
  FIND?: string
  /**
   * Уволен или нет сотрудник
   */
  ACTIVE?: iBXRestYesNo
  EMAIL?: string,
  LAST_LOGIN?: string,
  DATE_REGISTER?: string,
  IS_ONLINE?: iBXRestYesNo // wtf BX?
  PERSONAL_GENDER?: 'M' | 'F', // wtf BX? Where is others 48 gender?
  PERSONAL_PROFESSION?: string,
  PERSONAL_WWW?: string,
  PERSONAL_BIRTHDAY?: string,
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
  TIME_ZONE_OFFSET?: string,
  WORK_COMPANY?: string,
  WORK_PHONE?: string,
  UF_DEPARTMENT?: number[]
  UF_INTERESTS?: string,
  UF_SKILLS?: string,
  UF_WEB_SITES?: string,
  UF_XING?: string,
  UF_LINKEDIN?: string,
  UF_FACEBOOK?: string,
  UF_TWITTER?: string,
  UF_SKYPE?: string,
  UF_DISTRICT?: string,
  UF_PHONE_INNER?: string
}

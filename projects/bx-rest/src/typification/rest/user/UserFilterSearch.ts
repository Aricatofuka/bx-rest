export default interface UserFilterSearch {
  NAME?: string // имя
  LAST_NAME?: string, // фамилия
  SECOND_NAME?: string, // отчество
  WORK_POSITION?: string, // должность
  UF_DEPARTMENT_NAME?: string, //название подразделения
  USER_TYPE?: 'employee' | 'extranet' | 'email',
  FIND?: string // поиск по всем выше перечисленным полям
  ACTIVE?: boolean
  EMAIL?: string,
  LAST_LOGIN?: string,
  DATE_REGISTER?: string,
  IS_ONLINE?: 'Y' | 'N', // wtf BX?
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

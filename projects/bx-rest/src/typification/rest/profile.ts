export interface iBXRestProfileHttp extends iBXRestProfileBase {
  /** Идентификатор пользователя в исходном строковом формате REST API. */
  ID: string
}

export interface iBXRestProfile extends iBXRestProfileBase {
  /** Числовой идентификатор текущего пользователя. */
  ID: number
}

interface iBXRestProfileBase {
  /** Может ли пользователь управлять настройками портала. */
  ADMIN: boolean
  /** Фамилия пользователя. */
  LAST_NAME: string
  /** Имя пользователя. */
  NAME: string
  /** Пол пользователя в формате Битрикс24. */
  PERSONAL_GENDER: 'M' | 'F' | ''
  /** URL фотографии, если она присутствует в ответе портала. */
  PERSONAL_PHOTO?: string
  /** Название часового пояса; может быть пустой строкой. */
  TIME_ZONE: string
  /** Смещение часового пояса, если оно присутствует в ответе портала. */
  TIME_ZONE_OFFSET?: string
}

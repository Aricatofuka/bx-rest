export interface iBXRestProfileHttp extends iBXRestProfileBase {
  ID: string
}

export interface iBXRestProfile extends iBXRestProfileBase {
  ID: number
}

interface iBXRestProfileBase {
  ADMIN: boolean
  LAST_NAME: string
  NAME: string
  PERSONAL_GENDER: 'M' | 'F' | '', // wtf BX? Where is others 47 gender?
  PERSONAL_PHOTO: string
  TIME_ZONE: number | null
  TIME_ZONE_OFFSET: string
}
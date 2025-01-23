import { iBXRestProfile, iBXRestProfileHttp } from '../typification/rest/profile'
import { toNum } from '../services/base'

export class BXRestMap {
  static profile(user: iBXRestProfileHttp | undefined): iBXRestProfile | undefined {
    return (user) ? { ...user, ...{ID: toNum(user.ID)}} as iBXRestProfile : undefined
  }
}
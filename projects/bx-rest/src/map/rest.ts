import { Injectable } from '@angular/core'
import { BaseMapServices } from './base'
import { iBXRestProfile, iBXRestProfileHttp } from '../typification/rest/profile'

@Injectable({
  providedIn: 'root'
})
export class BXRestMaps extends BaseMapServices {
  profile(user: iBXRestProfileHttp | undefined): iBXRestProfile | undefined {
    return (user) ? { ...user, ...{ID: this.toNum(user.ID)}} as iBXRestProfile : undefined
  }
}
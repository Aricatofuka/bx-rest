import { inject, Injectable } from '@angular/core'
import { BXRestSocialNetWorkApi } from './socialnetwork/api'

@Injectable({
  providedIn: 'root'
})
export class BXRestSocialNetWork {

  // protected url = methods.socialNetWork
  // private http = inject(HttpBXServices)
  public api = inject(BXRestSocialNetWorkApi)



}
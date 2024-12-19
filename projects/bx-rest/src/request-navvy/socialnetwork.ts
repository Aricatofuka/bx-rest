import { inject, Injectable } from '@angular/core'
import { BXRestNavvySocialNetWorkApi } from './socialnetwork/api'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvySocialNetWork {
  public api = inject(BXRestNavvySocialNetWorkApi)

}
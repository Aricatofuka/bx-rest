import { inject, Injectable } from '@angular/core'
import { BXRestNavvySocialNetWorkApiContentView } from './api/contentview'
import { BXRestNavvySocialNetWorkApiLiveFeed } from './api/livefeed'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvySocialNetWorkApi {
  public contentView = inject(BXRestNavvySocialNetWorkApiContentView)
  public liveFeed = inject(BXRestNavvySocialNetWorkApiLiveFeed)
}
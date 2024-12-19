import { inject, Injectable } from '@angular/core'
import { BXRestSocialNetWorkApiContentView } from './api/contentview'
import { BXRestSocialNetWorkApiLiveFeed } from './api/livefeed'

@Injectable({
  providedIn: 'root'
})
export class BXRestSocialNetWorkApi {
  public readonly contentView  = inject(BXRestSocialNetWorkApiContentView)
  public readonly liveFeed  = inject(BXRestSocialNetWorkApiLiveFeed)
}
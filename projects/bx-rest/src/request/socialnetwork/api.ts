import { BXRestSocialNetWorkApiContentView } from './api/contentview'
import { BXRestSocialNetWorkApiLiveFeed } from './api/livefeed'

export class BXRestSocialNetWorkApi {
  public readonly contentView  = new BXRestSocialNetWorkApiContentView()
  public readonly liveFeed  = new BXRestSocialNetWorkApiLiveFeed()
}
import { BXRestNavvySocialNetWorkApiContentView } from './api/contentview'
import { BXRestNavvySocialNetWorkApiLiveFeed } from './api/livefeed'

export class BXRestNavvySocialNetWorkApi {
  public contentView = new BXRestNavvySocialNetWorkApiContentView()
  public liveFeed = new BXRestNavvySocialNetWorkApiLiveFeed()
}
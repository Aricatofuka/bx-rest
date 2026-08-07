import { BXRestNavvySocialNetWorkApiContentView } from './api/contentview'
import { BXRestNavvySocialNetWorkApiLiveFeed } from './api/livefeed'
import { BXRestNavvySocialNetworkApiWorkgroup } from './api/workgroup'

export class BXRestNavvySocialNetWorkApi {
  public contentView = new BXRestNavvySocialNetWorkApiContentView()
  public liveFeed = new BXRestNavvySocialNetWorkApiLiveFeed()
  public workgroup = new BXRestNavvySocialNetworkApiWorkgroup()
}

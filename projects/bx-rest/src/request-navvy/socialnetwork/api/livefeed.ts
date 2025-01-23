import { BXRestNavvySocialNetWorkApiLiveFeedBlogPost } from './livefeed/blogpost'
// import { Navvy } from '../../../services/navvy'
// import { BXRestSocialNetWorkApiLiveFeed } from '../../../request/socialnetwork/api/livefeed'

export class BXRestNavvySocialNetWorkApiLiveFeed {
  // private readonly contentView = new BXRestSocialNetWorkApiLiveFeed)
  // private readonly Navvy = new Navvy(this.contentView, null)

  public readonly blogPost = new BXRestNavvySocialNetWorkApiLiveFeedBlogPost()
}
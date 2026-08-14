import { BXRestNavvySocialNetWorkApiLiveFeedBlogPost } from './livefeed/blogpost'
// import { Navvy } from '../../../services/navvy'
// import { BXRestSocialNetWorkApiLiveFeed } from '../../../request/socialnetwork/api/livefeed'

export class BXRestNavvySocialNetWorkApiLiveFeed {
  // private readonly contentView = new BXRestSocialNetWorkApiLiveFeed)
  // private readonly Navvy = new Navvy(this.contentView, null)

  /**
   * Сообщения Ленты новостей в социальной сети (`socialnetwork.api.liveFeed.blogPost.*`).
   */
  public readonly blogPost = new BXRestNavvySocialNetWorkApiLiveFeedBlogPost()
}
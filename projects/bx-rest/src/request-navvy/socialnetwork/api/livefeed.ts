import { inject, Injectable } from '@angular/core'
import { BXRestNavvySocialNetWorkApiLiveFeedBlogPost } from './livefeed/blogpost'
// import { Navvy } from '../../../services/navvy'
// import { BXRestSocialNetWorkApiLiveFeed } from '../../../request/socialnetwork/api/livefeed'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvySocialNetWorkApiLiveFeed {
  // private readonly contentView = inject(BXRestSocialNetWorkApiLiveFeed)
  // private readonly Navvy = new Navvy(this.contentView, null)

  public readonly blogPost = inject(BXRestNavvySocialNetWorkApiLiveFeedBlogPost)
}
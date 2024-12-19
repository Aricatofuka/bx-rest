import { inject, Injectable } from '@angular/core'
import { BXRestSocialNetWorkApiLiveFeedBlogPost } from './livefeed/blogpost'


@Injectable({
  providedIn: 'root'
})
export class BXRestSocialNetWorkApiLiveFeed {
  public readonly blogPost = inject(BXRestSocialNetWorkApiLiveFeedBlogPost)
}
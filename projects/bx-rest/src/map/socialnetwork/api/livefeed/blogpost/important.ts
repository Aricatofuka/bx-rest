import { inject, Injectable } from '@angular/core'
import {
  iBXRestSocialNetWorkApiBlogpostImportantVote,
  iBXRestSocialNetWorkApiBlogpostImportantVoteHttp
} from '../../../../../typification/rest/socialnetwork/api/livefeed/blogpost/important/vote'
import { BaseServices } from '../../../../../services/base'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyMapSocialNetWorkApiLiveFeedBlogPostImportant {

  private readonly base = inject(BaseServices)

  vote(item: iBXRestSocialNetWorkApiBlogpostImportantVoteHttp | undefined): iBXRestSocialNetWorkApiBlogpostImportantVote | undefined {
    return (item) ? {
      success: this.base.toBool(item.success)
    } : undefined
  }
}
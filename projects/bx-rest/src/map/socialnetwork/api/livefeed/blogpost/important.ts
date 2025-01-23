import {
  iBXRestSocialNetWorkApiBlogpostImportantVote,
  iBXRestSocialNetWorkApiBlogpostImportantVoteHttp
} from '../../../../../typification/rest/socialnetwork/api/livefeed/blogpost/important/vote'
import { toBool } from '../../../../../services/base'

export class BXRestNavvyMapSocialNetWorkApiLiveFeedBlogPostImportant {

  static vote(item: iBXRestSocialNetWorkApiBlogpostImportantVoteHttp | undefined): iBXRestSocialNetWorkApiBlogpostImportantVote | undefined {
    return (item) ? {
      success: toBool(item.success)
    } : undefined
  }
}
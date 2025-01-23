import { methods } from '../../../../../typification/base/methods'
import { HttpBXServices } from '../../../../../services/http/HttpBX'
import {
  iBXRestParamSocialNetWorkApiBlogpostImportantVote, iBXRestSocialNetWorkApiBlogpostImportantVoteHttp
} from '../../../../../typification/rest/socialnetwork/api/livefeed/blogpost/important/vote'

export class BXRestSocialNetWorkApiLiveFeedBlogPostImportant {
  private url = methods.socialNetWork.api.liveFeed.blogPost.important
  private http = new HttpBXServices()

  vote(param: iBXRestParamSocialNetWorkApiBlogpostImportantVote) {
    return this.http.post<iBXRestSocialNetWorkApiBlogpostImportantVoteHttp>(this.url.vote, param)
  }
}
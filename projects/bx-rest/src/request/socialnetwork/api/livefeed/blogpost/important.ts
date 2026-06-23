import { HttpBXServices } from '../../../../../services/http/HttpBX'
import {
  iBXRestParamSocialNetWorkApiBlogpostImportantVote, iBXRestSocialNetWorkApiBlogpostImportantVoteHttp
} from '../../../../../typification/rest/socialnetwork/api/livefeed/blogpost/important/vote'
import { $api, $socialnetwork } from '../../../../../consts/part-name-methods'

export class BXRestSocialNetWorkApiLiveFeedBlogPostImportant {
  private url = {
    vote: [$socialnetwork, $api, 'liveFeed', 'blogPost', 'important', 'vote'],
  }
  private http = new HttpBXServices()

  vote(param: iBXRestParamSocialNetWorkApiBlogpostImportantVote) {
    return this.http.post<iBXRestSocialNetWorkApiBlogpostImportantVoteHttp>(this.url.vote, param)
  }
}

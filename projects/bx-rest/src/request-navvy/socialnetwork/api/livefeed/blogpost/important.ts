import { Navvy } from '../../../../../services/navvy'
import {
  iBXRestParamSocialNetWorkApiBlogpostImportantVote
} from '../../../../../typification/rest/socialnetwork'
import {
  BXRestNavvyMapSocialNetWorkApiLiveFeedBlogPostImportant
} from '../../../../../map/socialnetwork/api/livefeed/blogpost/important'
import { $api, $socialnetwork } from '../../../../../consts/part-name-methods'

export class BXRestNavvySocialNetWorkApiLiveFeedBlogPostImportant {
  public url = {
    vote: [$socialnetwork, $api, 'liveFeed', 'blogPost', 'important', 'vote']
  }

  private readonly Navvy = new Navvy()

  vote(param: iBXRestParamSocialNetWorkApiBlogpostImportantVote) {
    return this.Navvy.simple(
      this.url.vote, param,
      BXRestNavvyMapSocialNetWorkApiLiveFeedBlogPostImportant.vote
    )
  }
}
import { inject, Injectable } from '@angular/core'
import {
  BXRestSocialNetWorkApiLiveFeedBlogPostImportant
} from '../../../../../request/socialnetwork/api/livefeed/blogpost/important'
import { Navvy } from '../../../../../services/navvy'
import {
  iBXRestParamSocialNetWorkApiBlogpostImportantVote
} from '../../../../../typification/rest/socialnetwork/api/livefeed/blogpost/important/vote'
import {
  BXRestNavvyMapSocialNetWorkApiLiveFeedBlogPostImportant
} from '../../../../../map/socialnetwork/api/livefeed/blogpost/important'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvySocialNetWorkApiLiveFeedBlogPostImportant {

  private readonly important = inject(BXRestSocialNetWorkApiLiveFeedBlogPostImportant)
  private readonly map = inject(BXRestNavvyMapSocialNetWorkApiLiveFeedBlogPostImportant)

  private readonly Navvy = new Navvy(this.important, this.map)

  vote(param: iBXRestParamSocialNetWorkApiBlogpostImportantVote) {
    return this.Navvy.simpleWithArg(this.important.vote, param, this.map.vote)
  }
}
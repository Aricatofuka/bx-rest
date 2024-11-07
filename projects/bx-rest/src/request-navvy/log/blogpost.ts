import { inject, Injectable } from '@angular/core'
import { iBXRestParamLogBlogPostAdd } from '../../typification/rest/log/blogpost/add'
import { BXRestLogBlogPost } from '../../request/log/blogpost'
import { Navvy } from '../../services/navvy'
import { iBXRestParamBlogPostGet } from '../../typification/rest/log/blogpost/get'
import { BXRestMapLogBlogPost } from '../../map/log/blogpost'
import { methods } from '../../typification/base/methods';

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyLogBlogPost {
  url = methods.log.blogpost

  private readonly BXRestLogBlogPost = inject(BXRestLogBlogPost)
  private readonly map = inject(BXRestMapLogBlogPost)
  private Navvy = new Navvy(this.BXRestLogBlogPost, this.map)

  add(param: iBXRestParamLogBlogPostAdd) {
    return this.Navvy.simpleWithArg(this.BXRestLogBlogPost.add, param)
  }

  get(param: iBXRestParamBlogPostGet = {}) {
    return this.Navvy.PagNav(this.BXRestLogBlogPost.get, param, this.map.get)
  }

}

import { $blogcomment, $get, $log, $user } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import { iBXRestLogBlogCommentUserGetResult, iBXRestParamLogBlogCommentUserGet } from '../../../typification/rest/log'

export class BXRestNavvyLogBlogCommentUser {
  private readonly Navvy = new Navvy()
  private readonly url = {
    get: [$log, $blogcomment, $user, $get]
  }

  get(param: iBXRestParamLogBlogCommentUserGet = {}) {
    return this.Navvy.simple<
      iBXRestLogBlogCommentUserGetResult,
      iBXRestLogBlogCommentUserGetResult,
      iBXRestParamLogBlogCommentUserGet
    >(this.url.get, param)
  }
}


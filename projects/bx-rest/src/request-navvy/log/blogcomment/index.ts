import { $add, $blogcomment, $delete, $log } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import { iBXRestParamLogBlogCommentAdd, iBXRestParamLogBlogCommentDelete } from '../../../typification/rest/log'
import { BXRestNavvyLogBlogCommentUser } from './user'

export class BXRestNavvyLogBlogComment {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$log, $blogcomment, $add],
    delete: [$log, $blogcomment, $delete]
  }

  public readonly user = new BXRestNavvyLogBlogCommentUser()

  add(param: iBXRestParamLogBlogCommentAdd) {
    return this.Navvy.simple<number, number, iBXRestParamLogBlogCommentAdd>(
      this.url.add,
      param
    )
  }

  delete(param: iBXRestParamLogBlogCommentDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamLogBlogCommentDelete>(
      this.url.delete,
      param
    )
  }
}


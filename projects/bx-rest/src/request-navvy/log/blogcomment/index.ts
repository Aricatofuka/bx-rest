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

  /**
   * Комментарии к сообщению Ленты новостей (`log.blogcomment.user.*`).
   */
  public readonly user = new BXRestNavvyLogBlogCommentUser()

  /**
   * Добавляет комментарий к сообщению Ленты новостей.
   */
  add(param: iBXRestParamLogBlogCommentAdd) {
    return this.Navvy.simple<number, number, iBXRestParamLogBlogCommentAdd>(
      this.url.add,
      param
    )
  }

  /**
   * Удаляет комментарий к сообщению Ленты новостей.
   */
  delete(param: iBXRestParamLogBlogCommentDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamLogBlogCommentDelete>(
      this.url.delete,
      param
    )
  }
}


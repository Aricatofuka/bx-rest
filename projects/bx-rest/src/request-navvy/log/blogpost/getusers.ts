import { $blogpost, $getusers, $important, $log } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import { iBXRestParamLogBlogPostId } from '../../../typification/rest/log'

export class BXRestNavvyLogBlogPostGetUsers {
  private readonly Navvy = new Navvy()
  private readonly url = {
    important: [$log, $blogpost, $getusers, $important]
  }

  /**
   * Возвращает пользователей, прочитавших важное сообщение.
   */
  important(param: iBXRestParamLogBlogPostId) {
    return this.Navvy.simple<number[], number[], iBXRestParamLogBlogPostId>(
      this.url.important,
      param
    )
  }
}


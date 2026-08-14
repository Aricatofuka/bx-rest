import { $add, $blogpost, $delete, $get, $log, $share, $update } from '../../../consts/part-name-methods'
import { BXRestMapLogBlogPost } from '../../../map/log/blogpost'
import { Navvy } from '../../../services/navvy'
import { iBXRestParamBlogPostGet, iBXRestParamLogBlogPostAdd, iBXRestParamLogBlogPostId, iBXRestParamLogBlogPostShare, iBXRestParamLogBlogPostUpdate } from '../../../typification/rest/log'
import { BXRestNavvyLogBlogPostGetUsers } from './getusers'

export class BXRestNavvyLogBlogPost {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$log, $blogpost, $add],
    get: [$log, $blogpost, $get],
    delete: [$log, $blogpost, $delete],
    share: [$log, $blogpost, $share],
    update: [$log, $blogpost, $update]
  }

  /**
   * Пользователи, прочитавшие важное сообщение (`log.blogpost.getusers.*`).
   */
  public readonly getUsers = new BXRestNavvyLogBlogPostGetUsers()

  /**
   * Добавляет сообщение в Ленту новостей от имени текущего пользователя.
   */
  add(param: iBXRestParamLogBlogPostAdd) {
    return this.Navvy.simple<number, number, iBXRestParamLogBlogPostAdd>(
      this.url.add,
      param
    )
  }

  /**
   * Возвращает доступные текущему пользователю сообщения Ленты новостей.
   */
  get(param: iBXRestParamBlogPostGet = {}) {
    return this.Navvy.pagNav(this.url.get, param, BXRestMapLogBlogPost.get)
  }

  /**
   * Удаляет сообщение Ленты новостей.
   */
  delete(param: iBXRestParamLogBlogPostId) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamLogBlogPostId>(
      this.url.delete,
      param
    )
  }

  /**
   * Добавляет получателей сообщению Ленты новостей.
   */
  share(param: iBXRestParamLogBlogPostShare) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamLogBlogPostShare>(
      this.url.share,
      param
    )
  }

  /**
   * Изменяет сообщение Ленты новостей.
   */
  update(param: iBXRestParamLogBlogPostUpdate) {
    return this.Navvy.simple<number, number, iBXRestParamLogBlogPostUpdate>(
      this.url.update,
      param
    )
  }
}


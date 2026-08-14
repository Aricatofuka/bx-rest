import { Navvy } from '../../../services/navvy'
import { $add, $chat, $delete, $im, $list, $user } from '../../../consts/part-name-methods'
import {
  iBXRestImChatUserListParam,
  iBXRestImChatUserDeleteParam, iBXRestImChatUserAddParam
} from '../../../typification/rest/im'

export class BXRestNavvyImChatUser {
  private Navvy = new Navvy()

  url = {
    add: [$im, $chat, $user, $add],
    list: [$im, $chat, $user, $list],
    delete: [$im, $chat, $user, $delete],
  }

  /**
   * Возвращает идентификаторы участников чата.
   */
  list(param: iBXRestImChatUserListParam) {
    return this.Navvy.simple<number[], number[], iBXRestImChatUserListParam>(this.url.list, param)
  }

  /**
   * Исключает участников из чата.
   */
  delete(param: iBXRestImChatUserDeleteParam) {
    return this.Navvy.simple<number, number, iBXRestImChatUserDeleteParam>(this.url.delete, param)
  }

  /**
   * Приглаcить участников в чат
   */
  add(param: iBXRestImChatUserAddParam) {
    return this.Navvy.simple<boolean, boolean, iBXRestImChatUserAddParam>(this.url.add, param)
  }
}
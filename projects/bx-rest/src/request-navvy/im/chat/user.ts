import { Navvy } from '../../../services/navvy'
import { $add, $chat, $delete, $im, $list, $user } from '../../../consts/part-name-methods'
import { iBXRestImChatUserListParam } from '../../../typification/rest/im/chat/user/list'
import { iBXRestImChatUserDeleteParam } from '../../../typification/rest/im/chat/user/delete'
import { iBXRestImChatUserAddParam } from '../../../typification/rest/im/chat/user/add'

export class BXRestNavvyImChatUser {
  private Navvy = new Navvy()

  url = {
    add: [$im, $chat, $user, $add],
    list: [$im, $chat, $user, $list],
    delete: [$im, $chat, $user, $delete],
  }

  list(param: iBXRestImChatUserListParam) {
    return this.Navvy.simple<number[], number[], iBXRestImChatUserListParam>(this.url.list, param)
  }

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
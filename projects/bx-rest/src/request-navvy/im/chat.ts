import { iBXRestImChatAddParam } from '../../typification/rest/im/chat/add'
import { Navvy } from '../../services/navvy'
import {
  $add,
  $chat,
  $get,
  $im,
  $leave,
  $mute,
  $setOwner,
  $updateAvatar, $updateColor,
  $updateTitle
} from '../../consts/part-name-methods'
import { iBXRestImChatGetParam } from '../../typification/rest/im/chat/get'
import { iBXRestImChatSetOwnerParam } from '../../typification/rest/im/chat/setOwner'
import { iBXRestImChatUpdateAvatarParam } from '../../typification/rest/im/chat/updateAvatar'
import {
  iBXRestImChatUpdateTitleParam
} from '../../typification/rest/im/chat/updateTitle'
import { iBXRestImChatLeaveParam } from '../../typification/rest/im/chat/leave'
import { iBXRestImChatMuteParam } from '../../typification/rest/im/chat/mute'
import { BXRestNavvyImChatUser } from './chat/user'
import { iBXRestImChatUpdateColor } from '../../typification/rest/im/chat/updateColor'

export class BXRestNavvyImChat {

  url = {
    add: [$im, $chat, $add],
    get: [$im, $chat, $get],
    setOwner: [$im, $chat, $setOwner],
    updateAvatar: [$im, $chat, $updateAvatar],
    updateColor: [$im, $chat, $updateColor],
    updateTitle: [$im, $chat, $updateTitle],
    leave: [$im, $chat, $leave],
    mute: [$im, $chat, $mute],
  }

  private Navvy = new Navvy()
  public readonly user = new BXRestNavvyImChatUser()

  /**
   * Создать чат
   *
   * @param param
   */
  add(param: iBXRestImChatAddParam){
    return this.Navvy.simple<number, number, iBXRestImChatAddParam>(this.url.add, param)
  }

  /**
   * Получить идентификатор чата
   *
   * @param param
   */
  get(param: iBXRestImChatGetParam){
    return this.Navvy.simple<number, number, iBXRestImChatGetParam>(this.url.get, param)
  }

  /**
   * Сменить владельца чата
   *
   * @param param
   */
  setOwner(param: iBXRestImChatSetOwnerParam){
    return this.Navvy.simple<boolean, boolean, iBXRestImChatSetOwnerParam>(this.url.setOwner, param)
  }

  /**
   * Изменить аватарку чата
   *
   * @param param
   */
  updateAvatar(param: iBXRestImChatUpdateAvatarParam){
    return this.Navvy.simple<boolean, boolean, iBXRestImChatUpdateAvatarParam>(this.url.updateAvatar, param)
  }

  /**
   * Изменить заголовок чата
   *
   * @param param
   */
  updateTitle(param: iBXRestImChatUpdateTitleParam){
    return this.Navvy.simple<boolean, boolean, iBXRestImChatUpdateTitleParam>(this.url.updateTitle, param)
  }

  /**
   * Покинуть чат
   *
   * @param param
   */
  leave(param: iBXRestImChatLeaveParam){
    return this.Navvy.simple<boolean, boolean, iBXRestImChatLeaveParam>(this.url.leave, param)
  }

  /**
   * Отключить уведомления от чата
   *
   * @param param
   */
  mute(param: iBXRestImChatMuteParam){
    return this.Navvy.simple<boolean, boolean, iBXRestImChatMuteParam>(this.url.mute, param)
  }

  /**
   * Изменить цвет чата
   *
   * @param param
   */
  updateColor(param: iBXRestImChatUpdateColor){
    return this.Navvy.simple<boolean, boolean, iBXRestImChatUpdateColor>(this.url.updateColor, param)
  }
}

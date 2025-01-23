import { iBXRestParamImChatAdd } from '../../typification/rest/im/chat/add'
import { Navvy } from '../../services/navvy'
import { $add, $chat, $im } from '../../consts/part-name-methods'

export class BXRestNavvyImChat {

  url = {
    add: [$im, $chat, $add],
    // list: [$im, $chat, $user, $list],
    // add: [$im, $chat, $user, $add],
    // delete: [$im, $chat, $user, $delete],
    // updateTitle: [$im, $chat, $updateTitle],
    // updateColor: [$im, $chat, $updateColor],
    // updateAvatar: [$im, $chat, $updateAvatar],
    // setOwner: [$im, $chat, $setOwner],
    // get: [$im, $chat, $get],
    // mute: [$im, $chat, $mute],
  }

  private Navvy = new Navvy()

  add(param: iBXRestParamImChatAdd){
    return this.Navvy.simple<number, number, iBXRestParamImChatAdd>(this.url.add, param)
  }
}

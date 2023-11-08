import { Injectable } from '@angular/core'
import {
  $add,
  $chat,
  $get,
  $im, $mute,
  $setOwner,
  $updateAvatar,
  $updateColor,
  $updateTitle
} from '../../consts/part-name-methods'
import { iBXRestParamImChatAdd } from '../../typification/rest/im/chat/add'
import { HttpBXServices } from '../../services/http/HttpBX'

@Injectable({
  providedIn: 'root'
})
export class BXRestImChat {
  url = {
    add: [$im, $chat, $add],
    // list: [$im, $chat, $user, $list],
    // add: [$im, $chat, $user, $add],
    // delete: [$im, $chat, $user, $delete],
    updateTitle: [$im, $chat, $updateTitle],
    updateColor: [$im, $chat, $updateColor],
    updateAvatar: [$im, $chat, $updateAvatar],
    setOwner: [$im, $chat, $setOwner],
    get: [$im, $chat, $get],
    mute: [$im, $chat, $mute],
  }

  constructor(private http: HttpBXServices) {
  }

  add(param: iBXRestParamImChatAdd){
    return this.http.post<number>(this.url.add, param)
  }
}

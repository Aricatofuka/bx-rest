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
import { methods } from '../../methods';

@Injectable({
  providedIn: 'root'
})
export class BXRestImChat {
  url = methods.im.chat

  constructor(private http: HttpBXServices) {
  }

  add(param: iBXRestParamImChatAdd){
    return this.http.post<number>(this.url.add, param)
  }
}

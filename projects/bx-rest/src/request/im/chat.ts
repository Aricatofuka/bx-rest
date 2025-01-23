import { iBXRestParamImChatAdd } from '../../typification/rest/im/chat/add'
import { HttpBXServices } from '../../services/http/HttpBX'
import { methods } from '../../typification/base/methods'

export class BXRestImChat {
  url = methods.im.chat

  private readonly http = new HttpBXServices()

  add(param: iBXRestParamImChatAdd){
    return this.http.post<number>(this.url.add, param)
  }
}

import { inject, Injectable } from '@angular/core'
import { iBXRestParamImChatAdd } from '../../typification/rest/im/chat/add'
import { BXRestImChat } from '../../request/im/chat'
import { Navvy } from '../../services/navvy'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyImChat {

  private readonly BXRestImChat = inject(BXRestImChat)
  private Navvy = new Navvy(this.BXRestImChat, null)

  add(param: iBXRestParamImChatAdd){
    return this.Navvy.simpleWithArg(this.BXRestImChat.add, param)
  }
}

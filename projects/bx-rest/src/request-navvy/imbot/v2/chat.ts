import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $Chat, $add, $get, $imbot, $leave, $setOwner, $update, $v2 } from '../../../consts/part-name-methods'
import { BXRestNavvyImBotV2ChatInputAction } from './chat/inputaction'
import { BXRestNavvyImBotV2ChatManager } from './chat/manager'
import { BXRestNavvyImBotV2ChatMessage } from './chat/message'
import { BXRestNavvyImBotV2ChatTextField } from './chat/textfield'
import { BXRestNavvyImBotV2ChatUser } from './chat/user'

export class BXRestNavvyImBotV2Chat  {
  private readonly Navvy = new Navvy()

  public readonly inputAction = new BXRestNavvyImBotV2ChatInputAction()
  public readonly manager = new BXRestNavvyImBotV2ChatManager()
  public readonly message = new BXRestNavvyImBotV2ChatMessage()
  public readonly textField = new BXRestNavvyImBotV2ChatTextField()
  public readonly user = new BXRestNavvyImBotV2ChatUser()

  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $add], param)
  }

  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $get], param)
  }

  leave(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $leave], param)
  }

  setOwner(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $setOwner], param)
  }

  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $update], param)
  }
}


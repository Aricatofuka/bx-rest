import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $list, $messageservice, $sender, $update } from '../../consts/part-name-methods'

export class BXRestNavvyMessageServiceSender {
  private readonly Navvy = new Navvy()

  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<iBXRestGenericObject, iBXRestGenericObject, iBXRestGenericParams>(
      [$messageservice, $sender, $add], param
    )
  }

  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$messageservice, $sender, $delete], param
    )
  }

  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$messageservice, $sender, $list], param)
  }

  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<iBXRestGenericObject, iBXRestGenericObject, iBXRestGenericParams>(
      [$messageservice, $sender, $update], param
    )
  }
}


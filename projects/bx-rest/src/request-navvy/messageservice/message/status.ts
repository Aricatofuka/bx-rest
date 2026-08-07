import { Navvy } from '../../../services/navvy'
import { iBXRestGenericParams } from '../../../typification/rest/common'
import { $message, $messageservice, $status, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyMessageServiceMessageStatus {
  private readonly Navvy = new Navvy()

  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$messageservice, $message, $status, $update], param
    )
  }
}


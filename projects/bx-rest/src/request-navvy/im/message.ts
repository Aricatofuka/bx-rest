import { Navvy } from '../../services/navvy'
import { iBXRestParamImMessageAdd, iBXRestParamImMessageCommand, iBXRestParamImMessageDelete, iBXRestParamImMessageLike, iBXRestParamImMessageShare, iBXRestParamImMessageUpdate } from '../../typification/rest/im'
import { $add, $command, $delete, $im, $like, $message, $share, $update } from '../../consts/part-name-methods'

export class BXRestNavvyImMessage {
  private readonly Navvy = new Navvy()

  add(param: iBXRestParamImMessageAdd) {
    return this.Navvy.simple<number, number, iBXRestParamImMessageAdd>(
      [$im, $message, $add],
      param
    )
  }

  command(param: iBXRestParamImMessageCommand) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamImMessageCommand>(
      [$im, $message, $command],
      param
    )
  }

  delete(param: iBXRestParamImMessageDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamImMessageDelete>(
      [$im, $message, $delete],
      param
    )
  }

  like(param: iBXRestParamImMessageLike) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamImMessageLike>(
      [$im, $message, $like],
      param
    )
  }

  share(param: iBXRestParamImMessageShare) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamImMessageShare>(
      [$im, $message, $share],
      param
    )
  }

  update(param: iBXRestParamImMessageUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamImMessageUpdate>(
      [$im, $message, $update],
      param
    )
  }
}


import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $Im, $Integration, $send, $vote } from '../../../consts/part-name-methods'

export class BXRestNavvyVoteIntegrationIm {
  private readonly Navvy = new Navvy()

  /**
   * Создаёт и отправляет голосование в чат.
   */
  send(param: iBXRestGenericParams) {
    return this.Navvy.simple<iBXRestGenericObject, iBXRestGenericObject, iBXRestGenericParams>(
      [$vote, $Integration, $Im, $send], param
    )
  }
}


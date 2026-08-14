import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $list, $messageservice, $sender, $update } from '../../consts/part-name-methods'

export class BXRestNavvyMessageServiceSender {
  private readonly Navvy = new Navvy()

  /**
   * Регистрирует СМС-провайдер или провайдер сообщений.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<iBXRestGenericObject, iBXRestGenericObject, iBXRestGenericParams>(
      [$messageservice, $sender, $add], param
    )
  }

  /**
   * Удаляет СМС-провайдер или провайдер сообщений.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$messageservice, $sender, $delete], param
    )
  }

  /**
   * Возвращает список СМС-провайдеров или провайдеров сообщений.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$messageservice, $sender, $list], param)
  }

  /**
   * Обновляет СМС-провайдер или провайдер сообщений.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<iBXRestGenericObject, iBXRestGenericObject, iBXRestGenericParams>(
      [$messageservice, $sender, $update], param
    )
  }
}


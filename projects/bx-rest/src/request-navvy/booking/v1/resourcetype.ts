import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $booking, $delete, $get, $list, $resourcetype, $update, $v1 } from '../../../consts/part-name-methods'

export class BXRestNavvyBookingV1ResourceType  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет новый тип ресурса.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resourcetype, $add], param)
  }

  /**
   * Удаляет тип ресурса.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resourcetype, $delete], param)
  }

  /**
   * Возвращает тип ресурса.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resourcetype, $get], param)
  }

  /**
   * Возвращает список типов ресурсов.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resourcetype, $list], param)
  }

  /**
   * Обновляет тип ресурса.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resourcetype, $update], param)
  }
}


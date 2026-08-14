import { Navvy } from '../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../typification/rest/crm'
import { $add, $crm, $deletebyfilter, $getFieldsExact, $list, $orderentity } from '../../consts/part-name-methods'

export class BXRestNavvyCrmOrderEntity {
  private readonly Navvy = new Navvy()

  /**
   * Создаёт привязку заказа к объекту CRM.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $orderentity, $add], param
    )
  }

  /**
   * Удаляет привязки заказов к объектам CRM по фильтру.
   */
  deleteByFilter(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $orderentity, $deletebyfilter], param
    )
  }

  /**
   * Возвращает описание полей привязки заказа к объекту CRM.
   */
  getFields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $orderentity, $getFieldsExact])
  }

  /**
   * Возвращает список привязок заказов к объектам CRM.
   */
  list(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>(
      [$crm, $orderentity, $list], param
    )
  }
}


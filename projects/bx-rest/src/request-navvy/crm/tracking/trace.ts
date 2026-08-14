import { Navvy } from '../../../services/navvy'
import { iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $crm, $delete, $trace, $tracking } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmTrackingTrace {
  private readonly Navvy = new Navvy()

  /**
   * Создаёт трассировку сквозной аналитики (Sales Intelligence).
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $tracking, $trace, $add], param
    )
  }

  /**
   * Удаляет трассировку сквозной аналитики.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $tracking, $trace, $delete], param
    )
  }
}


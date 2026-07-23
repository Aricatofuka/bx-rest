import { $crm, $duplicate, $findbycomm } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmDuplicateFindByCommResult,
  iBXRestParamCrmDuplicateFindByComm
} from '../../../typification/rest/crm'
import { BXRestNavvyCrmDuplicateVolatileType } from './volatile-type'

export * from './volatile-type'

/** Поиск дубликатов и настройка полей поиска (`crm.duplicate.*`). */
export class BXRestNavvyCrmDuplicate {
  private readonly Navvy = new Navvy()
  private readonly url = {
    findByComm: [$crm, $duplicate, $findbycomm]
  }

  /** Дополнительные поля поиска дубликатов (`crm.duplicate.volatileType.*`). */
  public readonly volatileType = new BXRestNavvyCrmDuplicateVolatileType()

  /**
   * Возвращает идентификаторы лидов, контактов и компаний с совпадающими телефонами или email.
   * Добавочный номер телефона при поиске не учитывается; за один вызов можно передать до 20 значений.
   *
   * @param param Тип коммуникации, искомые значения и необязательное ограничение типа CRM-объекта.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/duplicates/crm-duplicate-find-by-comm.html
   */
  findByComm(param: iBXRestParamCrmDuplicateFindByComm) {
    return this.Navvy.simple<
      iBXRestCrmDuplicateFindByCommResult,
      iBXRestCrmDuplicateFindByCommResult,
      iBXRestParamCrmDuplicateFindByComm
    >(this.url.findByComm, param)
  }
}

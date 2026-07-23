import { $crm, $entity, $mergeBatch } from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import {
  iBXRestCrmEntityMergeBatchResult,
  iBXRestParamCrmEntityMergeBatch
} from '../../typification/rest/crm'

/** Операции над универсальными CRM-объектами (`crm.entity.*`). */
export class BXRestNavvyCrmEntity {
  private readonly Navvy = new Navvy()
  private readonly url = {
    mergeBatch: [$crm, $entity, $mergeBatch]
  }

  /**
   * Объединяет несколько CRM-объектов одного типа.
   * Первый идентификатор определяет главный объект; остальные объекты удаляются после успеха.
   * При статусе `CONFLICT` конфликтующие значения необходимо объединить вручную в интерфейсе Bitrix24.
   *
   * @param param Тип объекта и идентификаторы как минимум двух объединяемых элементов.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/duplicates/crm-entity-merge-batch.html
   */
  mergeBatch(param: iBXRestParamCrmEntityMergeBatch) {
    return this.Navvy.simple<
      iBXRestCrmEntityMergeBatchResult,
      iBXRestCrmEntityMergeBatchResult,
      iBXRestParamCrmEntityMergeBatch
    >(this.url.mergeBatch, param)
  }
}

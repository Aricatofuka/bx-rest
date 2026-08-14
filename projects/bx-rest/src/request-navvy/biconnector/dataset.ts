import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $biconnector, $dataset, $delete, $fields, $get, $list, $update } from '../../consts/part-name-methods'
import { BXRestNavvyBiConnectorDatasetFields } from './dataset/fields'

export class BXRestNavvyBiConnectorDataset {
  private readonly Navvy = new Navvy()

  public readonly fields = Object.assign(
    (param: iBXRestGenericParams) => this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$biconnector, $dataset, $fields], param),
    new BXRestNavvyBiConnectorDatasetFields()
  )

  /**
   * Добавляет новый датасет.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$biconnector, $dataset, $add], param)
  }

  /**
   * Удаляет датасет.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$biconnector, $dataset, $delete],
      param
    )
  }

  /**
   * Возвращает информацию о датасете.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$biconnector, $dataset, $get], param)
  }

  /**
   * Возвращает список доступных датасетов.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$biconnector, $dataset, $list], param)
  }

  /**
   * Обновляет существующий датасет.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$biconnector, $dataset, $update],
      param
    )
  }
}


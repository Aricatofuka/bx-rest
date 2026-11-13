import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $biconnector, $connector, $delete, $fields, $get, $list, $update } from '../../consts/part-name-methods'
import { pageNumberNav } from '../../services/navvy/sequential-navs'
import { PAGE_SIZE } from '../../consts/page-size'

export class BXRestNavvyBiConnectorConnector {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет новый коннектор
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$biconnector, $connector, $add], param)
  }

  /**
   * Удаляет коннектор
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$biconnector, $connector, $delete],
      param
    )
  }

  /**
   * Возвращает описание полей коннектора
   */
  fields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$biconnector, $connector, $fields], param)
  }

  /**
   * Возвращает информацию о коннекторе
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$biconnector, $connector, $get], param)
  }

  /**
   * Возвращает список доступных коннекторов
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.pagNavSequential<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$biconnector, $connector, $list], param, pageNumberNav(PAGE_SIZE))
  }

  /**
   * Обновляет существующий коннектор
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$biconnector, $connector, $update],
      param
    )
  }
}


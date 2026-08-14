import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $config, $delete, $get, $imopenlines, $update } from '../../consts/part-name-methods'
import { BXRestNavvyImOpenLinesConfigList } from './config/list'
import { BXRestNavvyImOpenLinesConfigPath } from './config/path'

export class BXRestNavvyImOpenLinesConfig  {
  private readonly Navvy = new Navvy()

  /**
   * Список открытых линий (`imopenlines.config.list.*`).
   */
  public readonly list = new BXRestNavvyImOpenLinesConfigList()
  /**
   * Публичная страница открытых линий (`imopenlines.config.path.*`).
   */
  public readonly path = new BXRestNavvyImOpenLinesConfigPath()

  /**
   * Добавляет новую открытую линию.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $config, $add], param)
  }

  /**
   * Удаляет открытую линию.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $config, $delete], param)
  }

  /**
   * Возвращает открытую линию по идентификатору.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $config, $get], param)
  }

  /**
   * Изменяет настройки открытой линии.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $config, $update], param)
  }
}


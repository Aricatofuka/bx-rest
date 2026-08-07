import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $config, $delete, $get, $imopenlines, $update } from '../../consts/part-name-methods'
import { BXRestNavvyImOpenLinesConfigList } from './config/list'
import { BXRestNavvyImOpenLinesConfigPath } from './config/path'

export class BXRestNavvyImOpenLinesConfig  {
  private readonly Navvy = new Navvy()

  public readonly list = new BXRestNavvyImOpenLinesConfigList()
  public readonly path = new BXRestNavvyImOpenLinesConfigPath()

  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $config, $add], param)
  }

  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $config, $delete], param)
  }

  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $config, $get], param)
  }

  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $config, $update], param)
  }
}


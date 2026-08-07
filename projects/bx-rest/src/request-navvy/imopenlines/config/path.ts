import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $config, $get, $imopenlines, $path } from '../../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesConfigPath  {
  private readonly Navvy = new Navvy()

  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $config, $path, $get], param)
  }
}


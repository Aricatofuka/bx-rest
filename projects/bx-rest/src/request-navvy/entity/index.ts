import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $entity, $get, $rights, $update } from '../../consts/part-name-methods'
import { BXRestNavvyEntityItem } from './item'
import { BXRestNavvyEntitySection } from './section'

export class BXRestNavvyEntity  {
  private readonly Navvy = new Navvy()

  public readonly item = new BXRestNavvyEntityItem()
  public readonly section = new BXRestNavvyEntitySection()

  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $add], param)
  }

  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $delete], param)
  }

  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$entity, $get], param)
  }

  rights(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$entity, $rights], param)
  }

  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$entity, $update], param)
  }
}


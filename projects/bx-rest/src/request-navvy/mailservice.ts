import { Navvy } from '../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../typification/rest/common'
import { $add, $delete, $fields, $get, $list, $mailservice, $update } from '../consts/part-name-methods'

export class BXRestNavvyMailService {
  private readonly Navvy = new Navvy()

  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<number, number, iBXRestGenericParams>(
      [$mailservice, $add], param
    )
  }

  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$mailservice, $delete], param
    )
  }

  fields() {
    return this.Navvy.simple<iBXRestGenericObject>([$mailservice, $fields])
  }

  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<iBXRestGenericObject, iBXRestGenericObject, iBXRestGenericParams>(
      [$mailservice, $get], param
    )
  }

  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$mailservice, $list], param)
  }

  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$mailservice, $update], param
    )
  }
}

import {
  $add,
  $delete,
  $element,
  $file,
  $get,
  $lists,
  $update,
  $url
} from '../../consts/part-name-methods'
import BXRestListsElementMap from '../../map/lists/element'
import { Navvy } from '../../services/navvy'
import {
  iBXRestParamListsElementAdd,
  iBXRestParamListsElementDelete,
  iBXRestParamListsElementGet,
  iBXRestParamListsElementGetFileUrl,
  iBXRestParamListsElementUpdate
} from '../../typification/rest/lists'

export class BXRestNavvyListsElement {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$lists, $element, $add],
    delete: [$lists, $element, $delete],
    get: [$lists, $element, $get],
    update: [$lists, $element, $update],
    getFileUrl: [$lists, $element, $get, $file, $url]
  }

  get(param: iBXRestParamListsElementGet) {
    return this.Navvy.pagNav(
      this.url.get,
      param,
      BXRestListsElementMap.get
    )
  }

  add(param: iBXRestParamListsElementAdd) {
    return this.Navvy.simple<number, number, iBXRestParamListsElementAdd>(
      this.url.add,
      param
    )
  }

  delete(param: iBXRestParamListsElementDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamListsElementDelete>(
      this.url.delete,
      param
    )
  }

  update(param: iBXRestParamListsElementUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamListsElementUpdate>(
      this.url.update,
      param
    )
  }

  getFileUrl(param: iBXRestParamListsElementGetFileUrl) {
    return this.Navvy.simple<
      string[],
      string[],
      iBXRestParamListsElementGetFileUrl
    >(this.url.getFileUrl, param)
  }
}

import {
  $add,
  $delete,
  $get,
  $iblock,
  $id,
  $lists,
  $type,
  $update
} from '../consts/part-name-methods'
import { BXRestMapLists } from '../map/lists'
import { BXRestNavvyListsElement } from './lists/element'
import BXRestNavvyListsField from './lists/field'
import { BXRestNavvyListsSection } from './lists/section'
import { Navvy } from '../services/navvy'
import {
  iBXRestParamListGet,
  iBXRestParamListsAdd,
  iBXRestParamListsDelete,
  iBXRestParamListsGetIBlockTypeId,
  iBXRestParamListsUpdate
} from '../typification/rest/lists'

export class BXRestNavvyLists {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$lists, $add],
    delete: [$lists, $delete],
    get: [$lists, $get],
    update: [$lists, $update],
    getIBlockTypeId: [$lists, $get, $iblock, $type, $id]
  }

  public readonly element = new BXRestNavvyListsElement()
  public readonly field = new BXRestNavvyListsField()
  public readonly section = new BXRestNavvyListsSection()

  add(param: iBXRestParamListsAdd) {
    return this.Navvy.simple<number, number, iBXRestParamListsAdd>(
      this.url.add,
      param
    )
  }

  delete(param: iBXRestParamListsDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamListsDelete>(
      this.url.delete,
      param
    )
  }

  get(param: iBXRestParamListGet) {
    return this.Navvy.pagNav(this.url.get, param, BXRestMapLists.get)
  }

  update(param: iBXRestParamListsUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamListsUpdate>(
      this.url.update,
      param
    )
  }

  getIBlockTypeId(param: iBXRestParamListsGetIBlockTypeId) {
    return this.Navvy.simple<
      string | null,
      string | null,
      iBXRestParamListsGetIBlockTypeId
    >(this.url.getIBlockTypeId, param)
  }
}

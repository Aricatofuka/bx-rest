import { $create, $delete, $get, $setowner, $sonet_group, $update } from '../consts/part-name-methods'
import { BXRestMapSonetGroup } from '../map/sonet_group'
import { BXRestNavvySonetGroupFeature } from './sonet_group/feature'
import { BXRestNavvySonetGroupUser } from './sonet_group/user'
import { Navvy } from '../services/navvy'
import {
  iBXRestParamSonetGroupCreate,
  iBXRestParamSonetGroupGet,
  iBXRestParamSonetGroupId,
  iBXRestParamSonetGroupSetOwner,
  iBXRestParamSonetGroupUpdate
} from '../typification/rest/sonet_group'

export class BXRestNavvySonetGroup {
  private readonly Navvy = new Navvy()
  private readonly url = {
    create: [$sonet_group, $create],
    delete: [$sonet_group, $delete],
    get: [$sonet_group, $get],
    setOwner: [$sonet_group, $setowner],
    update: [$sonet_group, $update]
  }

  public readonly feature = new BXRestNavvySonetGroupFeature()
  public readonly user = new BXRestNavvySonetGroupUser()

  create(param: iBXRestParamSonetGroupCreate) {
    return this.Navvy.simple<number, number, iBXRestParamSonetGroupCreate>(
      this.url.create,
      param
    )
  }

  delete(param: iBXRestParamSonetGroupId) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamSonetGroupId>(
      this.url.delete,
      param
    )
  }

  get(param: iBXRestParamSonetGroupGet = {}) {
    return this.Navvy.simple(this.url.get, param, BXRestMapSonetGroup.get)
  }

  setOwner(param: iBXRestParamSonetGroupSetOwner) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamSonetGroupSetOwner>(
      this.url.setOwner,
      param
    )
  }

  update(param: iBXRestParamSonetGroupUpdate) {
    return this.Navvy.simple<number, number, iBXRestParamSonetGroupUpdate>(
      this.url.update,
      param
    )
  }
}

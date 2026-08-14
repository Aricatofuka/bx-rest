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

  /**
   * Проверка прав на функциональность рабочей группы (`sonet_group.feature.*`).
   */
  public readonly feature = new BXRestNavvySonetGroupFeature()
  /**
   * Участники рабочей группы (`sonet_group.user.*`).
   */
  public readonly user = new BXRestNavvySonetGroupUser()

  /**
   * Создаёт рабочую группу или проект.
   */
  create(param: iBXRestParamSonetGroupCreate) {
    return this.Navvy.simple<number, number, iBXRestParamSonetGroupCreate>(
      this.url.create,
      param
    )
  }

  /**
   * Удаляет рабочую группу.
   */
  delete(param: iBXRestParamSonetGroupId) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamSonetGroupId>(
      this.url.delete,
      param
    )
  }

  /**
   * Возвращает список рабочих групп.
   */
  get(param: iBXRestParamSonetGroupGet = {}) {
    return this.Navvy.simple(this.url.get, param, BXRestMapSonetGroup.get)
  }

  /**
   * Изменяет владельца рабочей группы.
   */
  setOwner(param: iBXRestParamSonetGroupSetOwner) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamSonetGroupSetOwner>(
      this.url.setOwner,
      param
    )
  }

  /**
   * Изменяет параметры рабочей группы.
   */
  update(param: iBXRestParamSonetGroupUpdate) {
    return this.Navvy.simple<number, number, iBXRestParamSonetGroupUpdate>(
      this.url.update,
      param
    )
  }
}

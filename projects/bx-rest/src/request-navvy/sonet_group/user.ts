import { $add, $delete, $get, $groups, $invite, $request, $sonet_group, $update, $user } from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import {
  iBXRestParamSonetGroupUserChange,
  iBXRestParamSonetGroupUserGet,
  iBXRestParamSonetGroupUserInvite,
  iBXRestParamSonetGroupUserRequest,
  iBXRestParamSonetGroupUserUpdate,
  iBXRestSonetGroupUser,
  iBXRestSonetGroupUserGroup
} from '../../typification/rest/sonet_group'

export class BXRestNavvySonetGroupUser {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$sonet_group, $user, $add],
    delete: [$sonet_group, $user, $delete],
    get: [$sonet_group, $user, $get],
    groups: [$sonet_group, $user, $groups],
    invite: [$sonet_group, $user, $invite],
    request: [$sonet_group, $user, $request],
    update: [$sonet_group, $user, $update]
  }

  /**
   * Добавляет пользователей в рабочую группу.
   */
  add(param: iBXRestParamSonetGroupUserChange) {
    return this.Navvy.simple<number[], number[], iBXRestParamSonetGroupUserChange>(
      this.url.add,
      param
    )
  }

  /**
   * Удаляет пользователей из рабочей группы.
   */
  delete(param: iBXRestParamSonetGroupUserChange) {
    return this.Navvy.simple<number[], number[], iBXRestParamSonetGroupUserChange>(
      this.url.delete,
      param
    )
  }

  /**
   * Возвращает список участников рабочей группы.
   */
  get(param: iBXRestParamSonetGroupUserGet) {
    return this.Navvy.simple<
      iBXRestSonetGroupUser[],
      iBXRestSonetGroupUser[],
      iBXRestParamSonetGroupUserGet
    >(this.url.get, param)
  }

  /**
   * Возвращает список групп текущего пользователя.
   */
  groups() {
    return this.Navvy.simple<iBXRestSonetGroupUserGroup[]>(this.url.groups)
  }

  /**
   * Приглашает пользователей в рабочую группу.
   */
  invite(param: iBXRestParamSonetGroupUserInvite) {
    return this.Navvy.simple<number[], number[], iBXRestParamSonetGroupUserInvite>(
      this.url.invite,
      param
    )
  }

  /**
   * Отправляет запрос на вступление в рабочую группу.
   */
  request(param: iBXRestParamSonetGroupUserRequest) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamSonetGroupUserRequest>(
      this.url.request,
      param
    )
  }

  /**
   * Изменяет роль пользователя в рабочей группе.
   */
  update(param: iBXRestParamSonetGroupUserUpdate) {
    return this.Navvy.simple<number[], number[], iBXRestParamSonetGroupUserUpdate>(
      this.url.update,
      param
    )
  }
}

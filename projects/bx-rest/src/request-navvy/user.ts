import { Navvy } from '../services/navvy'
import {
  iBXRestParamUserAdd,
  iBXRestParamUserUpdate,
  iBXRestParamUserGet,
  iBXRestParamUserAccess,
  iBXRestParamUserSearch,
  iBXRestUser,
  iBXRestUserHttp,
  iBXRestUserHttpField
} from '../typification/rest/user'
import clone from 'just-clone'
import { BXRestNavvyUserUserfield } from './user/userfield'
import { BXRestMapUser } from '../map/user'
import { $access, $add, $admin, $current, $fields, $get, $search, $update, $user } from '../consts/part-name-methods'
import { BXRestNavvyUserOption } from './user/option'

export class BXRestNavvyUser {
  def: { params: { ACTIVE: boolean, start: 0 } } = {
    params: {ACTIVE: true, start: 0}
  }
  url = {
    add: [$user, $add],
    admin: [$user, $admin],
    get: [$user, $get],
    current: [$user, $current],
    update: [$user, $update],
    search: [$user, $search],
    access: [$user, $access], // U1 - пользователь с id =1
    // AU - все авторизованные пользователи
    // D1 - подразделение с id=1
    // G1 - группа с id=1
    fields: [$user, $fields],
  }

  /**
   * Пользовательские поля профиля (`user.userfield.*`).
   */
  public readonly userField = new BXRestNavvyUserUserfield()
  /** Персональные настройки текущего пользователя для приложения. */
  public readonly option = new BXRestNavvyUserOption()
  private readonly Navvy = new Navvy()

  /** Invites an intranet or extranet user. Requires user invitation rights. */
  add(param: iBXRestParamUserAdd) {
    return this.Navvy.simple<number, number, iBXRestParamUserAdd>(
      this.url.add,
      param
    )
  }

  /**
   * Проверяет, может ли текущий пользователь управлять настройками приложений.
   *
   * Возвращает `true` для пользователя с соответствующими административными
   * правами и `false` в остальных случаях.
   */
  admin() {
    return this.Navvy.simple<boolean>(
      this.url.admin
    )
  }

  /**
   * Возвращает список пользователей по фильтру.
   */
  get(params: iBXRestParamUserGet = {}) {
    let copyParams = clone(params)
    this.setDefParam(copyParams)

    return this.Navvy.pagNav(
      this.url.get,
      copyParams,
      BXRestMapUser.get)
  }

  /**
   * Возвращает информацию о текущем пользователе.
   */
  current() {
    return this.Navvy.simple<iBXRestUserHttp, iBXRestUser>(
      this.url.current,
      undefined,
      BXRestMapUser.current
    )
  }

  /**
   * Обновляет данные пользователя. Доступно только пользователю с правами приглашения пользователей.
   */
  update(param: iBXRestParamUserUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamUserUpdate>(
      this.url.update,
      param
    )
  }

  search(params: iBXRestParamUserSearch) {
    return this.Navvy.pagNav(
      this.url.search,
      params,
      BXRestMapUser.get
    )
  }

  /**
   * Проверяет наличие хотя бы одного из указанных кодов доступа.
   *
   * Для обратной совместимости можно передать как объект
   * `{ ACCESS: ['G2', 'AU'] }`, так и непосредственно массив кодов.
   */
  access(params: iBXRestParamUserAccess | string[]) {
    const preparedParams: iBXRestParamUserAccess = Array.isArray(params)
      ? {ACCESS: params}
      : params

    return this.Navvy.simple<boolean, boolean, iBXRestParamUserAccess>(
      this.url.access,
      preparedParams,
    )
  }

  /**
   * Возвращает список полей профиля пользователя.
   */
  fields() {
    return this.Navvy.simple<iBXRestUserHttpField>(this.url.fields)
  }

  /**
   * Дополняет параметры запроса пользователей значениями по умолчанию (ACTIVE, start).
   */
  private setDefParam(params: iBXRestParamUserGet) {
    if (!params.FILTER) {
      params.FILTER = {}
    }

    if (!Object.prototype.hasOwnProperty.call(params.FILTER, 'ACTIVE')) {
      params.FILTER.ACTIVE = this.def.params.ACTIVE
    } else if (typeof params.FILTER.ACTIVE !== 'boolean') {
      delete params.FILTER.ACTIVE
    }

    if (!Object.prototype.hasOwnProperty.call(params, 'start')) {
      params.start = this.def.params.start
    }

    if (params.FILTER.UF_DEPARTMENT && !params.FILTER.UF_DEPARTMENT.length) {
      delete params.FILTER.UF_DEPARTMENT
    }
  }

}


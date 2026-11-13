import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $Bot, $get, $imbot, $list, $register, $unregister, $update, $v2 } from '../../../consts/part-name-methods'
import { offsetNav } from '../../../services/navvy/sequential-navs'
import { PAGE_SIZE } from '../../../consts/page-size'

export class BXRestNavvyImBotV2Bot  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает информацию о боте
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Bot, $get], param)
  }

  /**
   * Возвращает список ботов приложения
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.pagNavSequential<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >(
      [$imbot, $v2, $Bot, $list],
      param,
      offsetNav(
        { offset: 'offset', limit: 'limit', pageSize: PAGE_SIZE },
        result => result?.['hasNextPage'] === true,
        { keys: ['bots', 'users'] }
      )
    )
  }

  /**
   * Регистрирует нового бота
   */
  register(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Bot, $register], param)
  }

  /**
   * Удаляет бота
   */
  unregister(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Bot, $unregister], param)
  }

  /**
   * Обновляет свойства бота
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Bot, $update], param)
  }
}


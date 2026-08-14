import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $activate, $imconnector, $list, $register, $status, $unregister } from '../../consts/part-name-methods'
import { BXRestNavvyImConnectorChat } from './chat'
import { BXRestNavvyImConnectorConnector } from './connector'
import { BXRestNavvyImConnectorDelete } from './delete'
import { BXRestNavvyImConnectorSend } from './send'
import { BXRestNavvyImConnectorUpdate } from './update'

export class BXRestNavvyImConnector  {
  private readonly Navvy = new Navvy()

  /**
   * Название чата коннектора (`imconnector.chat.*`).
   */
  public readonly chat = new BXRestNavvyImConnectorChat()
  /**
   * Настройки коннектора (`imconnector.connector.*`).
   */
  public readonly connector = new BXRestNavvyImConnectorConnector()
  /**
   * Удаление отправленных сообщений (`imconnector.delete.*`).
   */
  public readonly delete = new BXRestNavvyImConnectorDelete()
  /**
   * Отправка сообщений через коннектор (`imconnector.send.*`).
   */
  public readonly send = new BXRestNavvyImConnectorSend()
  /**
   * Изменение отправленных сообщений (`imconnector.update.*`).
   */
  public readonly update = new BXRestNavvyImConnectorUpdate()

  /**
   * Активирует коннектор.
   */
  activate(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$imconnector, $activate], param)
  }

  /**
   * Возвращает список коннекторов.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$imconnector, $list], param)
  }

  /**
   * Регистрирует коннектор открытых линий.
   */
  register(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$imconnector, $register], param)
  }

  /**
   * Возвращает статус коннектора.
   */
  status(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imconnector, $status], param)
  }

  /**
   * Отменяет регистрацию коннектора.
   */
  unregister(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$imconnector, $unregister], param)
  }
}


import { Navvy } from '../services/navvy'
import { BXRestMapApp } from '../map/app'
import { iBXRestAppInfo, iBXRestAppInfoHttp } from '../typification/rest/app'
import { BXRestNavvyAppOption } from './app/option'

/** Информация и общие настройки текущего приложения (`app.*`). */
export class BXRestNavvyApp {

  private readonly Navvy = new Navvy()
  /** Общие настройки приложения. */
  public readonly option = new BXRestNavvyAppOption()

  /**
   * Возвращает информацию о текущем приложении и лицензии портала.
   *
   * Метод не принимает параметров, работает только в контексте приложения и
   * доступен любому пользователю. Результат содержит код, версию, статус,
   * состояние оплаты и сведения о тарифе.
   */
  info() {
    return this.Navvy.simple<iBXRestAppInfoHttp, iBXRestAppInfo>(
      ['app', 'info'],
      undefined,
      BXRestMapApp.info
    )
  }
}

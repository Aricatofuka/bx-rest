import { BXRestNavvyPullConfig } from './pull/config'
import { BXRestNavvyPullChannelPublic } from './pull/channel/public'
import { BXRestNavvyPullApplicationConfig } from './pull/application/config'
import { BXRestNavvyPullApplicationEvent } from './pull/application/event'
import { BXRestNavvyPullApplicationPush } from './pull/application/push'

/**
 * Push & Pull: настройки подключения к серверу и отправка событий приложения.
 * Клиента веб-сокета в библиотеке нет, подключаться к серверу нужно своим клиентом.
 */
export class BXRestNavvyPull {
  /**
   * Настройки подключения к серверам Push & Pull (`pull.config.*`).
   */
  public readonly config = new BXRestNavvyPullConfig()
  public readonly channel = {
    public: new BXRestNavvyPullChannelPublic()
  }
  public readonly application = {
    /** Настройки подключения для приложения (`pull.application.config.*`). */
    config: new BXRestNavvyPullApplicationConfig(),
    /** События в канал приложения (`pull.application.event.*`). */
    event: new BXRestNavvyPullApplicationEvent(),
    /** Push-уведомления в мобильное приложение (`pull.application.push.*`). */
    push: new BXRestNavvyPullApplicationPush(),
  }
}

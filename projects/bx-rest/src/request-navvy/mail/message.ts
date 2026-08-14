import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $createcalendarevent, $createchat, $createcrmactivity, $createfeedpost, $createtask, $forward, $get, $list, $mail, $message, $movetofolder, $removecrmactivity, $reply, $send, $thread } from '../../consts/part-name-methods'
import { BXRestNavvyMailMessageField } from './message/field'

export class BXRestNavvyMailMessage  {
  private readonly Navvy = new Navvy()

  /**
   * Поля письма (`mail.message.field.*`).
   */
  public readonly field = new BXRestNavvyMailMessageField()

  /**
   * Создаёт событие календаря из письма.
   */
  createcalendarevent(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $createcalendarevent], param)
  }

  /**
   * Создаёт чат из письма.
   */
  createchat(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $createchat], param)
  }

  /**
   * Создаёт дело CRM из письма.
   */
  createcrmactivity(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $createcrmactivity], param)
  }

  /**
   * Создаёт сообщение Ленты новостей из письма.
   */
  createfeedpost(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $createfeedpost], param)
  }

  /**
   * Создаёт задачу из письма.
   */
  createtask(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $createtask], param)
  }

  /**
   * Пересылает письмо.
   */
  forward(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $forward], param)
  }

  /**
   * Возвращает письмо по идентификатору.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $get], param)
  }

  /**
   * Ищет письма в почтовых ящиках текущего пользователя.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $list], param)
  }

  /**
   * Перемещает письма в папку, спам или корзину.
   */
  movetofolder(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $movetofolder], param)
  }

  /**
   * Удаляет связь письма с делом CRM.
   */
  removecrmactivity(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $removecrmactivity], param)
  }

  /**
   * Отправляет ответ на письмо.
   */
  reply(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $reply], param)
  }

  /**
   * Отправляет новое письмо.
   */
  send(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $send], param)
  }

  /**
   * Возвращает цепочку писем по идентификатору одного письма.
   */
  thread(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $thread], param)
  }
}


import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $get, $list, $mail, $mailbox, $senders } from '../../consts/part-name-methods'
import { restV3PageNav } from '../../services/navvy/sequential-navs'
import { MAIL_MAILBOX_MAX_PAGE_SIZE, MAIL_PAGE_SIZE } from '../../consts/page-size'
import { BXRestNavvyMailMailboxField } from './mailbox/field'

export class BXRestNavvyMailMailbox  {
  private readonly Navvy = new Navvy()

  /**
   * Поля почтового ящика (`mail.mailbox.field.*`).
   */
  public readonly field = new BXRestNavvyMailMailboxField()

  /**
   * Возвращает почтовый ящик по идентификатору
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $mailbox, $get], param)
  }

  /**
   * Возвращает список почтовых ящиков текущего пользователя
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.pagNavSequentialV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $mailbox, $list], param, restV3PageNav(MAIL_PAGE_SIZE, MAIL_MAILBOX_MAX_PAGE_SIZE))
  }

  /**
   * Возвращает адреса отправителей, доступные текущему пользователю
   */
  senders(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $mailbox, $senders], param)
  }
}


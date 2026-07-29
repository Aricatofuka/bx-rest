import {
  $activity,
  $add,
  $bizproc,
  $delete,
  $list,
  $log,
  $update
} from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import {
  iBXRestParamBizprocActivityAdd,
  iBXRestParamBizprocActivityDelete,
  iBXRestParamBizprocActivityLog,
  iBXRestParamBizprocActivityUpdate
} from '../../typification/rest/bizproc'

/** Действия бизнес-процессов приложения (`bizproc.activity.*`). */
export class BXRestNavvyBizProcActivity {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Регистрирует новое действие. */
    add: [$bizproc, $activity, $add],
    /** Обновляет зарегистрированное действие. */
    update: [$bizproc, $activity, $update],
    /** Возвращает коды действий приложения. */
    list: [$bizproc, $activity, $list],
    /** Записывает сообщение в журнал бизнес-процесса. */
    log: [$bizproc, $activity, $log],
    /** Удаляет зарегистрированное действие. */
    delete: [$bizproc, $activity, $delete]
  }

  /**
   * Регистрирует новое действие бизнес-процесса для текущего приложения.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-activity/bizproc-activity-add.html
   */
  add(param: iBXRestParamBizprocActivityAdd) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamBizprocActivityAdd>(
      this.url.add,
      param
    )
  }

  /**
   * Обновляет поля зарегистрированного действия.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-activity/bizproc-activity-update.html
   */
  update(param: iBXRestParamBizprocActivityUpdate) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamBizprocActivityUpdate
    >(this.url.update, param)
  }

  /**
   * Возвращает список символьных кодов действий текущего приложения.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-activity/bizproc-activity-list.html
   */
  list() {
    return this.Navvy.simple<string[]>(this.url.list)
  }

  /**
   * Записывает сообщение в журнал бизнес-процесса.
   *
   * Регистрация действия должна содержать `USE_SUBSCRIPTION: 'Y'`, а токен
   * события должен оставаться актуальным.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-activity/bizproc-activity-log.html
   */
  log(param: iBXRestParamBizprocActivityLog) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamBizprocActivityLog>(
      this.url.log,
      param
    )
  }

  /**
   * Удаляет действие, зарегистрированное текущим приложением.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-activity/bizproc-activity-delete.html
   */
  delete(param: iBXRestParamBizprocActivityDelete) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamBizprocActivityDelete
    >(this.url.delete, param)
  }
}

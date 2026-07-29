import {
  $add,
  $bizproc,
  $delete,
  $list,
  $robot,
  $update
} from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import {
  iBXRestParamBizprocRobotAdd,
  iBXRestParamBizprocRobotDelete,
  iBXRestParamBizprocRobotUpdate
} from '../../typification/rest/bizproc'

/** Роботы приложения (`bizproc.robot.*`). */
export class BXRestNavvyBizProcRobot {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Регистрирует нового робота. */
    add: [$bizproc, $robot, $add],
    /** Обновляет зарегистрированного робота. */
    update: [$bizproc, $robot, $update],
    /** Возвращает коды роботов приложения. */
    list: [$bizproc, $robot, $list],
    /** Удаляет зарегистрированного робота. */
    delete: [$bizproc, $robot, $delete]
  }

  /**
   * Регистрирует нового робота для текущего приложения.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-robot/bizproc-robot-add.html
   */
  add(param: iBXRestParamBizprocRobotAdd) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamBizprocRobotAdd>(
      this.url.add,
      param
    )
  }

  /**
   * Обновляет поля зарегистрированного робота.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-robot/bizproc-robot-update.html
   */
  update(param: iBXRestParamBizprocRobotUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamBizprocRobotUpdate>(
      this.url.update,
      param
    )
  }

  /**
   * Возвращает список символьных кодов роботов текущего приложения.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-robot/bizproc-robot-list.html
   */
  list() {
    return this.Navvy.simple<string[]>(this.url.list)
  }

  /**
   * Удаляет робота, зарегистрированного текущим приложением.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-robot/bizproc-robot-delete.html
   */
  delete(param: iBXRestParamBizprocRobotDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamBizprocRobotDelete>(
      this.url.delete,
      param
    )
  }
}

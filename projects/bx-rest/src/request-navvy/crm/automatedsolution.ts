import { Navvy } from '../../services/navvy'
import { $add, $automatedsolution, $crm, $delete, $get, $list, $update } from '../../consts/part-name-methods'
import {
  iBXRestCrmAutomatedSolution,
  iBXRestCrmAutomatedSolutionFields,
  iBXRestCrmAutomatedSolutionResult,
  iBXRestParamCrmAutomatedSolutionAdd,
  iBXRestParamCrmAutomatedSolutionDelete,
  iBXRestParamCrmAutomatedSolutionGet,
  iBXRestParamCrmAutomatedSolutionList,
  iBXRestParamCrmAutomatedSolutionUpdate
} from '../../typification/rest/crm'
import { BXRestMapCrmAutomatedSolution } from '../../map/crm'

export class BXRestNavvyCrmAutomatedSolution {
  url = {
    /** Создает новое цифровое рабочее место. */
    add: [$crm, $automatedsolution, $add],
    /** Возвращает цифровое рабочее место по идентификатору. */
    get: [$crm, $automatedsolution, $get],
    /** Возвращает список цифровых рабочих мест. */
    list: [$crm, $automatedsolution, $list],
    /** Обновляет существующее цифровое рабочее место. */
    update: [$crm, $automatedsolution, $update],
    /** Удаляет цифровое рабочее место. */
    delete: [$crm, $automatedsolution, $delete],
    /** Возвращает описание полей цифрового рабочего места. */
    fields: [$crm, $automatedsolution, 'fields']
  }

  private Navvy = new Navvy()

  /**
   * Создает новое цифровое рабочее место.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/automated-solution/crm-automated-solution-add.html
   */
  add(param: iBXRestParamCrmAutomatedSolutionAdd) {
    return this.Navvy.simple<
      iBXRestCrmAutomatedSolutionResult,
      iBXRestCrmAutomatedSolution,
      iBXRestParamCrmAutomatedSolutionAdd
    >(
      this.url.add,
      param,
      BXRestMapCrmAutomatedSolution.get
    )
  }

  /**
   * Возвращает цифровое рабочее место по идентификатору.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/automated-solution/crm-automated-solution-get.html
   */
  get(param: iBXRestParamCrmAutomatedSolutionGet) {
    return this.Navvy.simple<
      iBXRestCrmAutomatedSolutionResult,
      iBXRestCrmAutomatedSolution,
      iBXRestParamCrmAutomatedSolutionGet
    >(
      this.url.get,
      param,
      BXRestMapCrmAutomatedSolution.get
    )
  }

  /**
   * Возвращает список цифровых рабочих мест.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/automated-solution/crm-automated-solution-list.html
   */
  list(param: iBXRestParamCrmAutomatedSolutionList = {}) {
    return this.Navvy.pagNavResultKey<
      iBXRestCrmAutomatedSolution,
      iBXRestCrmAutomatedSolution,
      iBXRestParamCrmAutomatedSolutionList,
      'automatedSolutions'
    >(
      this.url.list,
      param,
      'automatedSolutions',
      BXRestMapCrmAutomatedSolution.list
    )
  }

  /**
   * Обновляет существующее цифровое рабочее место.
   * При передаче `typeIds` список привязанных смарт-процессов перезаписывается целиком.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/automated-solution/crm-automated-solution-update.html
   */
  update(param: iBXRestParamCrmAutomatedSolutionUpdate) {
    return this.Navvy.simple<
      iBXRestCrmAutomatedSolutionResult,
      iBXRestCrmAutomatedSolution,
      iBXRestParamCrmAutomatedSolutionUpdate
    >(
      this.url.update,
      param,
      BXRestMapCrmAutomatedSolution.get
    )
  }

  /**
   * Удаляет цифровое рабочее место.
   * Удаление возможно только если к рабочему месту не привязаны смарт-процессы.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/automated-solution/crm-automated-solution-delete.html
   */
  delete(param: iBXRestParamCrmAutomatedSolutionDelete) {
    return this.Navvy.simple<null, null, iBXRestParamCrmAutomatedSolutionDelete>(this.url.delete, param)
  }

  /**
   * Возвращает описание полей цифрового рабочего места.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/automated-solution/crm-automated-solution-fields.html
   */
  fields() {
    return this.Navvy.simple<
      iBXRestCrmAutomatedSolutionFields,
      iBXRestCrmAutomatedSolutionFields,
      undefined
    >(this.url.fields)
  }
}

import { Navvy } from '../../../services/navvy'
import { $add, $automation, $crm, $delete, $execute, $list, $trigger } from '../../../consts/part-name-methods'
import {
  iBXRestCrmAutomationTrigger,
  iBXRestParamCrmAutomationTrigger,
  iBXRestParamCrmAutomationTriggerAdd,
  iBXRestParamCrmAutomationTriggerDelete,
  iBXRestParamCrmAutomationTriggerExecute
} from '../../../typification/rest/crm'

/** Методы автоматизации CRM (`crm.automation.*`). */
export class BXRestNavvyCrmAutomation {
  private readonly Navvy = new Navvy()
  private readonly url = {
    trigger: [$crm, $automation, $trigger],
    triggerAdd: [$crm, $automation, $trigger, $add],
    triggerList: [$crm, $automation, $trigger, $list],
    triggerExecute: [$crm, $automation, $trigger, $execute],
    triggerDelete: [$crm, $automation, $trigger, $delete]
  }

  /**
   * Запускает webhook-триггер, настроенный в автоматизации CRM.
   * Значение `target` передается в формате `TYPENAME_ID`, например `DEAL_25`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/automation/crm-automation-trigger.html
   */
  public readonly trigger = Object.assign(
    (param: iBXRestParamCrmAutomationTrigger) => {
      return this.Navvy.simple<boolean, boolean, iBXRestParamCrmAutomationTrigger>(
        this.url.trigger,
        param
      )
    },
    {
      /**
       * Добавляет триггер приложения.
       * Метод доступен только в контексте приложения; повторный `CODE` обновит `NAME`.
       *
       * @see https://apidocs.bitrix24.ru/api-reference/crm/automation/triggers/crm-automation-trigger-add.html
       */
      add: (param: iBXRestParamCrmAutomationTriggerAdd) => {
        return this.Navvy.simple<boolean, boolean, iBXRestParamCrmAutomationTriggerAdd>(
          this.url.triggerAdd,
          param
        )
      },

      /**
       * Возвращает список триггеров приложения.
       * Метод доступен только в контексте приложения.
       *
       * @see https://apidocs.bitrix24.ru/api-reference/crm/automation/triggers/crm-automation-trigger-list.html
       */
      list: () => {
        return this.Navvy.simple<iBXRestCrmAutomationTrigger[]>(this.url.triggerList)
      },

      /**
       * Запускает триггер приложения для конкретного объекта CRM.
       * Тип объекта берется из `crm.enum.ownertype`, идентификатор объекта - из CRM-элемента.
       *
       * @see https://apidocs.bitrix24.ru/api-reference/crm/automation/triggers/crm-automation-trigger-execute.html
       */
      execute: (param: iBXRestParamCrmAutomationTriggerExecute) => {
        return this.Navvy.simple<boolean, boolean, iBXRestParamCrmAutomationTriggerExecute>(
          this.url.triggerExecute,
          param
        )
      },

      /**
       * Удаляет триггер приложения.
       * Метод доступен только в контексте приложения.
       *
       * @see https://apidocs.bitrix24.ru/api-reference/crm/automation/triggers/crm-automation-trigger-delete.html
       */
      delete: (param: iBXRestParamCrmAutomationTriggerDelete) => {
        return this.Navvy.simple<boolean, boolean, iBXRestParamCrmAutomationTriggerDelete>(
          this.url.triggerDelete,
          param
        )
      }
    }
  )
}

import { iBXRestCrmFieldDescription } from '../enum'

/** Цифровое рабочее место CRM. */
export interface iBXRestCrmAutomatedSolution {
  /** Уникальный идентификатор цифрового рабочего места. */
  id: number
  /** Название цифрового рабочего места. */
  title: string
  /** Идентификаторы смарт-процессов, привязанных к рабочему месту. */
  typeIds: number[]
}

/** Контейнер ответа методов `crm.automatedsolution.add`, `get` и `update`. */
export interface iBXRestCrmAutomatedSolutionResult {
  automatedSolution: iBXRestCrmAutomatedSolution
}

/** Контейнер ответа метода `crm.automatedsolution.list`. */
export interface iBXRestCrmAutomatedSolutionListResult {
  automatedSolutions?: iBXRestCrmAutomatedSolution[]
}

/** Описание полей цифрового рабочего места. */
export type iBXRestCrmAutomatedSolutionFields = Record<string, iBXRestCrmFieldDescription & {
  /** Верхний регистр имени поля в REST API. */
  upperName: string
}>

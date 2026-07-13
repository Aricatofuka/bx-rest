export interface iBXRestParamCrmAutomatedSolutionUpdate {
  /** Идентификатор цифрового рабочего места. */
  id: number | string
  fields: {
    /** Название цифрового рабочего места. */
    title?: string
    /** Полный список идентификаторов смарт-процессов, которые должны быть привязаны к рабочему месту. */
    typeIds?: number[]
  }
}

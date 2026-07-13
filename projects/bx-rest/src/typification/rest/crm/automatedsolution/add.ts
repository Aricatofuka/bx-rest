export interface iBXRestParamCrmAutomatedSolutionAdd {
  fields: {
    /** Название цифрового рабочего места. */
    title: string
    /** Идентификаторы смарт-процессов, которые нужно привязать к рабочему месту. */
    typeIds?: number[]
  }
}

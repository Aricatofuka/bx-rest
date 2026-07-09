/** Параметры запуска webhook-триггера, настроенного в автоматизации CRM. */
export interface iBXRestParamCrmAutomationTrigger {
  /** Целевой объект автоматизации в формате `TYPENAME_ID`, например `DEAL_25`. */
  target: string
  /** Символьный код триггера из настроек автоматизации CRM. */
  code?: string
}

/** Параметры регистрации триггера приложения. */
export interface iBXRestParamCrmAutomationTriggerAdd {
  /** Внутренний уникальный идентификатор триггера в рамках приложения. */
  CODE: string
  /** Название триггера. */
  NAME: string
}

/** Триггер приложения, зарегистрированный в автоматизации CRM. */
export interface iBXRestCrmAutomationTrigger {
  /** Название триггера. */
  NAME: string
  /** Внутренний уникальный идентификатор триггера в рамках приложения. */
  CODE: string
}

/** Параметры запуска триггера приложения для объекта CRM. */
export interface iBXRestParamCrmAutomationTriggerExecute {
  /** Внутренний уникальный идентификатор триггера в рамках приложения. */
  CODE: string
  /** Тип объекта CRM из справочника `crm.enum.ownertype`. */
  OWNER_TYPE_ID: number
  /** Идентификатор элемента CRM. */
  OWNER_ID: number
}

/** Параметры удаления триггера приложения. */
export interface iBXRestParamCrmAutomationTriggerDelete {
  /** Внутренний уникальный идентификатор триггера в рамках приложения. */
  CODE: string
}

/**
 * Идентификатор типа CRM-объекта для объединения.
 *
 * Стандартные значения: `1` — лид, `2` — сделка, `3` — контакт, `4` — компания,
 * `7` — предложение, `31` — счет. Для смарт-процесса передается его динамический идентификатор.
 */
export type iBXRestCrmEntityTypeId = number

/** Параметры метода `crm.entity.mergeBatch`. */
export interface iBXRestParamCrmEntityMergeBatch {
  /** Контейнер параметров объединения. */
  params: {
    /** Идентификатор типа объединяемых CRM-объектов. */
    entityTypeId: iBXRestCrmEntityTypeId
    /**
     * Идентификаторы как минимум двух объектов одного типа.
     * Первый объект становится главным, остальные удаляются после успешного объединения.
     */
    entityIds: number[]
  }
}

/** Статус объединения CRM-объектов. */
export type iBXRestCrmEntityMergeBatchStatus = 'SUCCESS' | 'CONFLICT' | 'ERROR'

/** Результат метода `crm.entity.mergeBatch`. */
export interface iBXRestCrmEntityMergeBatchResult {
  /** Статус автоматического объединения. */
  STATUS: iBXRestCrmEntityMergeBatchStatus
  /** Идентификаторы объектов, удаленных после успешного объединения. */
  ENTITY_IDS: number[]
}

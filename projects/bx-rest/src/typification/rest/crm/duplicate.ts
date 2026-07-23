/** Тип CRM-объекта, поддерживаемый поиском дубликатов. */
export type iBXRestCrmDuplicateEntityType = 'LEAD' | 'CONTACT' | 'COMPANY'

/** Числовой идентификатор типа CRM-объекта, поддерживаемого настройкой поиска дубликатов. */
export type iBXRestCrmDuplicateEntityTypeId = 1 | 3 | 4

/** Тип коммуникации, по которой выполняется поиск совпадений. */
export type iBXRestCrmDuplicateCommunicationType = 'EMAIL' | 'PHONE'

/** Параметры метода `crm.duplicate.findbycomm`. */
export interface iBXRestParamCrmDuplicateFindByComm {
  /** Тип коммуникации: email-адрес или телефон. */
  type: iBXRestCrmDuplicateCommunicationType
  /** Email-адреса или телефоны для поиска. Метод принимает не более 20 значений. */
  values: string[]
  /** Ограничение поиска одним типом CRM-объекта. По умолчанию поиск идет по всем типам. */
  entity_type?: iBXRestCrmDuplicateEntityType
}

/** Идентификаторы CRM-объектов с совпадающими коммуникациями. */
export type iBXRestCrmDuplicateFindByCommResult = Partial<
  Record<iBXRestCrmDuplicateEntityType, number[]>
>

/** Параметры метода `crm.duplicate.volatileType.fields`. */
export interface iBXRestParamCrmDuplicateVolatileTypeFields {
  /** Тип CRM-объекта. Если не указан, возвращаются поля лидов, контактов и компаний. */
  entityTypeId?: iBXRestCrmDuplicateEntityTypeId
}

/** Поле, которое можно использовать для поиска дубликатов. */
export interface iBXRestCrmDuplicateVolatileTypeField {
  /** Тип CRM-объекта, которому принадлежит поле. */
  entityTypeId: iBXRestCrmDuplicateEntityTypeId
  /** Код стандартного или пользовательского поля. */
  fieldCode: string
  /** Отображаемое название поля. */
  fieldTitle: string
}

/** Параметры метода `crm.duplicate.volatileType.register`. */
export interface iBXRestParamCrmDuplicateVolatileTypeRegister {
  /** Тип CRM-объекта: `1` — лид, `3` — контакт, `4` — компания. */
  entityTypeId: iBXRestCrmDuplicateEntityTypeId
  /** Код поля из результата `crm.duplicate.volatileType.fields`. */
  fieldCode: string
}

/** Результат добавления поля в поиск дубликатов. */
export interface iBXRestCrmDuplicateVolatileTypeRegisterResult {
  /** Идентификатор записи, необходимый для последующего удаления поля из поиска. */
  id: number
}

/** Нестандартное поле, уже участвующее в поиске дубликатов. */
export interface iBXRestCrmDuplicateVolatileType {
  /** Идентификатор записи о добавленном поле. */
  id: number
  /** Тип CRM-объекта, которому принадлежит поле. */
  entityTypeId: iBXRestCrmDuplicateEntityTypeId
  /** Код поля. */
  fieldCode: string
}

/** Параметры метода `crm.duplicate.volatileType.unregister`. */
export interface iBXRestParamCrmDuplicateVolatileTypeUnregister {
  /** Идентификатор записи из результата `crm.duplicate.volatileType.list` или `register`. */
  id: number
}

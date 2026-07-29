import { iBXRestCrmFieldDescription } from '../enum'

/** Связь записи таймлайна с элементом CRM. */
export interface iBXRestCrmTimelineBinding {
  /** Идентификатор записи таймлайна. */
  OWNER_ID: string
  /** Идентификатор связанного элемента CRM. */
  ENTITY_ID: string
  /** Тип элемента CRM: `lead`, `deal`, `contact`, `company` или `order`. */
  ENTITY_TYPE: string
}

/** Поля для добавления или удаления связи записи таймлайна. */
export interface iBXRestCrmTimelineBindingFields {
  /** Идентификатор записи таймлайна. */
  OWNER_ID: number
  /** Идентификатор элемента CRM. */
  ENTITY_ID: number
  /** Тип элемента CRM: `lead`, `deal`, `contact`, `company` или `order`. */
  ENTITY_TYPE: string
}

/** Параметры добавления или удаления связи записи таймлайна. */
export interface iBXRestParamCrmTimelineBindingChange {
  /** Поля связи. */
  fields: iBXRestCrmTimelineBindingFields
}

/** Параметры получения связей записи таймлайна. */
export interface iBXRestParamCrmTimelineBindingList {
  /** Фильтр с обязательным идентификатором записи таймлайна. */
  filter: {
    OWNER_ID: number
  }
}

/** Описание полей связи, возвращаемое `crm.timeline.bindings.fields`. */
export type iBXRestCrmTimelineBindingFieldsDescription = Record<
  keyof iBXRestCrmTimelineBinding,
  iBXRestCrmFieldDescription
>

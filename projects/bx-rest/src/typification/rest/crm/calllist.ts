import { iBXRestParamSort } from '../base/sort'

/** Тип CRM-объектов, участников списка обзвона. */
export type iBXRestCrmCallListEntityType = 'CONTACT' | 'COMPANY'

/** Числовой идентификатор типа участника: контакт или компания. */
export type iBXRestCrmCallListEntityTypeId = 3 | 4

/** Параметры метода `crm.calllist.add`. */
export interface iBXRestParamCrmCallListAdd {
  /** Тип участников создаваемого обзвона. */
  ENTITY_TYPE: iBXRestCrmCallListEntityType
  /** Идентификаторы контактов или компаний. */
  ENTITIES: number[]
  /** Идентификатор CRM-формы, которая будет показана во время обзвона. */
  WEBFORM_ID?: number
}

/** Параметры метода `crm.calllist.get`. */
export interface iBXRestParamCrmCallListGet {
  /** Идентификатор списка обзвона. */
  ID: number
}

/** Параметры метода `crm.calllist.update`. */
export interface iBXRestParamCrmCallListUpdate {
  /** Идентификатор изменяемого списка обзвона. */
  LIST_ID: number
  /** Тип участников списка. */
  ENTITY_TYPE: iBXRestCrmCallListEntityType
  /**
   * Полный новый набор идентификаторов контактов или компаний.
   * Метод заменяет существующий состав списка, а не дополняет его.
   */
  ENTITIES: number[]
  /**
   * Новый идентификатор CRM-формы.
   * Если поле не передано, Bitrix24 очищает ранее установленную CRM-форму.
   */
  WEBFORM_ID?: number
}

/** Поля списка обзвона, доступные для выборки. */
export type iBXRestCrmCallListField =
  | 'ID'
  | 'DATE_CREATE'
  | 'CREATED_BY_ID'
  | 'WEBFORM_ID'
  | 'ENTITY_TYPE_ID'

/** Поля списка обзвона, доступные для фильтрации. */
export type iBXRestCrmCallListFilterField =
  | 'ID'
  | 'CREATED_BY_ID'
  | 'WEBFORM_ID'
  | 'ENTITY_TYPE_ID'

/** REST-операторы, поддерживаемые фильтром списка обзвонов. */
export type iBXRestCrmCallListFilterOperator = '>=' | '>' | '<=' | '<' | '@' | '!@' | '=' | '!=' | '!'

/** Ключ фильтра списка обзвонов с необязательным REST-оператором. */
export type iBXRestCrmCallListFilterKey =
  | iBXRestCrmCallListFilterField
  | `${iBXRestCrmCallListFilterOperator}${iBXRestCrmCallListFilterField}`

/** Значение фильтра списка обзвонов. */
export type iBXRestCrmCallListFilterValue = number | string | (number | string)[]

/** Параметры метода `crm.calllist.list`. */
export interface iBXRestParamCrmCallListList {
  /** Поля, которые нужно вернуть. По умолчанию возвращаются все доступные поля. */
  SELECT?: iBXRestCrmCallListField[]
  /** Фильтр по полям списка обзвона, включая REST-префиксы операторов. */
  FILTER?: Partial<Record<iBXRestCrmCallListFilterKey, iBXRestCrmCallListFilterValue>>
  /** Порядок сортировки списка обзвонов. */
  ORDER?: Partial<Record<iBXRestCrmCallListField, iBXRestParamSort>>
}

/** Параметры метода `crm.calllist.items.get`. */
export interface iBXRestParamCrmCallListItemsGet {
  /** Идентификатор списка обзвона. */
  LIST_ID: number
  /** Фильтр участников по коду статуса из `crm.calllist.statuslist`. */
  FILTER?: {
    STATUS?: string
  }
}

interface iBXRestCrmCallListBase {
  /** Тип CRM-объектов, включенных в обзвон. */
  ENTITY_TYPE: iBXRestCrmCallListEntityType
}

/** Список обзвона в локальном формате библиотеки. */
export interface iBXRestCrmCallList extends iBXRestCrmCallListBase {
  /** Идентификатор списка обзвона. */
  ID: number
  /** Дата и время создания списка. */
  DATE_CREATE: Date
  /** Идентификатор пользователя, создавшего список. */
  CREATED_BY_ID: number
  /** Идентификатор связанной CRM-формы. */
  WEBFORM_ID: number
  /** Числовой идентификатор типа CRM-объекта. */
  ENTITY_TYPE_ID: iBXRestCrmCallListEntityTypeId
}

/** Список обзвона в формате ответа Bitrix24. */
export interface iBXRestCrmCallListHttp extends iBXRestCrmCallListBase {
  ID: string
  DATE_CREATE: string
  CREATED_BY_ID: string
  WEBFORM_ID: string
  ENTITY_TYPE_ID: `${iBXRestCrmCallListEntityTypeId}`
}

/**
 * Элемент результата `crm.calllist.list`.
 * Набор полей зависит от параметра `SELECT`.
 */
export type iBXRestCrmCallListListItem = Partial<iBXRestCrmCallList>

/** Элемент результата `crm.calllist.list` в формате ответа Bitrix24. */
export type iBXRestCrmCallListListItemHttp = Partial<iBXRestCrmCallListHttp>

/** Участник списка обзвона. */
export interface iBXRestCrmCallListItem {
  /** Идентификатор контакта или компании. */
  ID: number
  /** Код текущего статуса обзвона участника. */
  STATUS: string
  /** Числовой идентификатор типа CRM-объекта. */
  ENTITY_TYPE: iBXRestCrmCallListEntityTypeId
}

/** Статус участника списка обзвона. */
export interface iBXRestCrmCallListStatus {
  /** Числовой идентификатор элемента справочника. */
  ID: number
  /** Отображаемое название статуса. */
  NAME: string
  /** Позиция статуса в справочнике. */
  SORT: number
  /** Код статуса для фильтра `crm.calllist.items.get`. */
  STATUS_ID: string
}

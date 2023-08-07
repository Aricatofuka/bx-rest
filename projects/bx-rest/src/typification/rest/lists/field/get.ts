export interface iRestBXParamListField {
  IBLOCK_TYPE_ID: 'lists' | 'bitrix_processes' | 'lists_socnet' // id типа инфоблока:
  // lists - тип инфоблока списка
  // bitrix_processes - тип инфоблока процессов
  // lists_socnet - тип инфоблока списков групп
  IBLOCK_CODE?: string // код инфоблока
  IBLOCK_ID?: number, // id инфоблока
  FIELD_ID?: number, // id поля
  SOCNET_GROUP_ID?: number,	// id группы, обязателен, если список находится в группах
}

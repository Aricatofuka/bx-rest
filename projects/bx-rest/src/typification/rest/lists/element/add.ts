export interface iBXRestParamListsElementAdd {
  IBLOCK_TYPE_ID: 'lists' | 'bitrix_processes', // TODO: выделить в отдельный тип
  IBLOCK_ID: number | any,
  ELEMENT_CODE: string,
  FIELDS: {
    NAME: string,
    [key: string]: any
  }
}

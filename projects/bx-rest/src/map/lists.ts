import { iBXRestListItem, iBXRestListItemHttp } from '../typification/rest/lists/get'
import BXRestMapListsElement from './lists/element'
import { BXRestMapListsField } from './lists/field'
import { toNum, toStr } from '../services/base'

export class BXRestMapLists {

  public readonly element = new BXRestMapListsElement()
  public readonly field = new BXRestMapListsField()

  static get(value: iBXRestListItemHttp[] | undefined): iBXRestListItem[] | undefined {
    return (value) ? value.map(i => BXRestMapLists.iBXRestListItemHttpToiBXRestListItem(i)) : undefined
  }

  static iBXRestListItemHttpToiBXRestListItem(itemLists: iBXRestListItemHttp): iBXRestListItem
  {
    return {
      ACTIVE: itemLists.ACTIVE === 'Y',
      API_CODE: toStr(itemLists.API_CODE),
      BIZPROC: itemLists.BIZPROC === 'Y',
      CANONICAL_PAGE_URL: toStr(itemLists.CANONICAL_PAGE_URL),
      CODE: itemLists.CODE,
      DESCRIPTION: toStr(itemLists.DESCRIPTION),
      DESCRIPTION_TYPE: itemLists.DESCRIPTION_TYPE,
      DETAIL_PAGE_URL: toStr(itemLists.DETAIL_PAGE_URL),
      EDIT_FILE_AFTER: toStr(itemLists.EDIT_FILE_AFTER),
      EDIT_FILE_BEFORE: toStr(itemLists.EDIT_FILE_BEFORE),
      ELEMENTS_NAME: toStr(itemLists.ELEMENTS_NAME),
      ELEMENT_NAME: toStr(itemLists.ELEMENT_NAME),
      EXTERNAL_ID: toStr(itemLists.EXTERNAL_ID),
      IBLOCK_TYPE_ID: toStr(itemLists.IBLOCK_TYPE_ID),
      ID: toNum(itemLists.ID),
      INDEX_ELEMENT: itemLists.INDEX_ELEMENT === 'Y',
      INDEX_SECTION: itemLists.INDEX_SECTION === 'Y',
      LANG_DIR: toStr(itemLists.LANG_DIR),
      LAST_CONV_ELEMENT: toNum(itemLists.LAST_CONV_ELEMENT),
      LID: toStr(itemLists.LID),
      LIST_MODE: toStr(itemLists.LIST_MODE),
      LIST_PAGE_URL: toStr(itemLists.LIST_PAGE_URL),
      NAME: toStr(itemLists.NAME),
      PICTURE: toStr(itemLists.PICTURE),
      PROPERTY_INDEX: toStr(itemLists.PROPERTY_INDEX),
      REST_ON: itemLists.REST_ON === 'Y',
      RIGHTS_MODE: toStr(itemLists.RIGHTS_MODE),
      RSS_ACTIVE: itemLists.RSS_ACTIVE === 'Y',
      RSS_FILE_ACTIVE: itemLists.RSS_FILE_ACTIVE === 'Y',
      RSS_FILE_DAYS: toStr(itemLists.RSS_FILE_DAYS),
      RSS_FILE_LIMIT: toStr(itemLists.RSS_FILE_LIMIT),
      RSS_TTL: toNum(itemLists.RSS_TTL),
      RSS_YANDEX_ACTIVE: itemLists.RSS_YANDEX_ACTIVE === 'Y',
      SECTIONS_NAME: toStr(itemLists.SECTIONS_NAME),
      SECTION_CHOOSER: toStr(itemLists.SECTION_CHOOSER),
      SECTION_NAME: toStr(itemLists.SECTION_NAME),
      SECTION_PAGE_URL: toStr(itemLists.SECTION_PAGE_URL),
      SECTION_PROPERTY: toStr(itemLists.SECTION_PROPERTY),
      SERVER_NAME: toStr(itemLists.SERVER_NAME),
      SOCNET_GROUP_ID: toStr(itemLists.SOCNET_GROUP_ID),
      SORT: toNum(itemLists.SORT),
      TIMESTAMP_X: new Date(itemLists.TIMESTAMP_X),
      TMP_ID:  toStr(itemLists.TMP_ID),
      VERSION: toNum(itemLists.VERSION),
      WORKFLOW: itemLists.WORKFLOW === 'Y',
      XML_ID:  toStr(itemLists.XML_ID),
    }
  }
}

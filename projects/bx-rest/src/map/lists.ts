import { Injectable } from '@angular/core'
import { BaseMapServices } from './base'
import BXRestListsElementMap from './lists/element'
import { iBXRestListItem, iBXRestListItemHttp } from '../typification/rest/lists/get'


@Injectable({
  providedIn: 'root'
})
export class BXRestMapLists extends BaseMapServices {

  constructor(public element: BXRestListsElementMap) {
    super()
  }

  get(value: iBXRestListItemHttp[] | undefined): iBXRestListItem[] | undefined {
    return (value) ? value.map(i => this.iBXRestListItemHttpToiBXRestListItem(i)) : undefined
  }

  private iBXRestListItemHttpToiBXRestListItem(itemLists: iBXRestListItemHttp): iBXRestListItem
  {
    return {
      ACTIVE: itemLists.ACTIVE === 'Y',
      API_CODE: this.toStr(itemLists.API_CODE),
      BIZPROC: itemLists.BIZPROC === 'Y',
      CANONICAL_PAGE_URL: this.toStr(itemLists.CANONICAL_PAGE_URL),
      CODE: itemLists.CODE,
      DESCRIPTION: this.toStr(itemLists.DESCRIPTION),
      DESCRIPTION_TYPE: itemLists.DESCRIPTION_TYPE,
      DETAIL_PAGE_URL: this.toStr(itemLists.DETAIL_PAGE_URL),
      EDIT_FILE_AFTER: this.toStr(itemLists.EDIT_FILE_AFTER),
      EDIT_FILE_BEFORE: this.toStr(itemLists.EDIT_FILE_BEFORE),
      ELEMENTS_NAME: this.toStr(itemLists.ELEMENTS_NAME),
      ELEMENT_NAME: this.toStr(itemLists.ELEMENT_NAME),
      EXTERNAL_ID: this.toStr(itemLists.EXTERNAL_ID),
      IBLOCK_TYPE_ID: this.toStr(itemLists.IBLOCK_TYPE_ID),
      ID: Number(itemLists.ID),
      INDEX_ELEMENT: itemLists.INDEX_ELEMENT === 'Y',
      INDEX_SECTION: itemLists.INDEX_SECTION === 'Y',
      LANG_DIR: this.toStr(itemLists.LANG_DIR),
      LAST_CONV_ELEMENT: this.toNum(itemLists.LAST_CONV_ELEMENT),
      LID: this.toStr(itemLists.LID),
      LIST_MODE: this.toStr(itemLists.LIST_MODE),
      LIST_PAGE_URL: this.toStr(itemLists.LIST_PAGE_URL),
      NAME: this.toStr(itemLists.NAME),
      PICTURE: this.toStr(itemLists.PICTURE),
      PROPERTY_INDEX: this.toStr(itemLists.PROPERTY_INDEX),
      REST_ON: itemLists.REST_ON === 'Y',
      RIGHTS_MODE: this.toStr(itemLists.RIGHTS_MODE),
      RSS_ACTIVE: itemLists.RSS_ACTIVE === 'Y',
      RSS_FILE_ACTIVE: itemLists.RSS_FILE_ACTIVE === 'Y',
      RSS_FILE_DAYS: this.toStr(itemLists.RSS_FILE_DAYS),
      RSS_FILE_LIMIT: this.toStr(itemLists.RSS_FILE_LIMIT),
      RSS_TTL: Number(itemLists.RSS_TTL),
      RSS_YANDEX_ACTIVE: itemLists.RSS_YANDEX_ACTIVE === 'Y',
      SECTIONS_NAME: this.toStr(itemLists.SECTIONS_NAME),
      SECTION_CHOOSER: this.toStr(itemLists.SECTION_CHOOSER),
      SECTION_NAME: this.toStr(itemLists.SECTION_NAME),
      SECTION_PAGE_URL: this.toStr(itemLists.SECTION_PAGE_URL),
      SECTION_PROPERTY: this.toStr(itemLists.SECTION_PROPERTY),
      SERVER_NAME: this.toStr(itemLists.SERVER_NAME),
      SOCNET_GROUP_ID: this.toStr(itemLists.SOCNET_GROUP_ID),
      SORT: this.toStr(itemLists.SOCNET_GROUP_ID),
      TIMESTAMP_X: new Date(itemLists.TIMESTAMP_X),
      TMP_ID:  this.toStr(itemLists.SOCNET_GROUP_ID),
      VERSION: Number(itemLists.VERSION),
      WORKFLOW: itemLists.WORKFLOW === 'Y',
      XML_ID:  this.toStr(itemLists.SOCNET_GROUP_ID),
    }
  }

}

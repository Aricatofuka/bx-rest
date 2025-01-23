import {
  iBXRestTaskItemUserFieldGetlist, iBXRestTaskItemUserFieldGetlistHttp,
} from '../../../typification/rest/task/item/userfield/getlist'
import { toNum } from '../../../services/base'

export class BXRestMapTaskUserField {

  static getList(value: iBXRestTaskItemUserFieldGetlistHttp[] | undefined): iBXRestTaskItemUserFieldGetlist[] | undefined{
    if(value && value.length){
      return value.map( i => { return {
        ID: toNum(i.ID),
        ENTITY_ID: 'TASKS_TASK',
        FIELD_NAME: i.FIELD_NAME,
        USER_TYPE_ID: i.USER_TYPE_ID,
        XML_ID: i.XML_ID,
        SORT: i.SORT,
        MULTIPLE: i.MULTIPLE === 'Y',
        MANDATORY: i.MULTIPLE === 'Y',
        SHOW_FILTER: i.SHOW_FILTER,
        SHOW_IN_LIST: i.MULTIPLE === 'Y',
        EDIT_IN_LIST: i.MULTIPLE === 'Y',
        IS_SEARCHABLE: i.MULTIPLE === 'Y',
        SETTINGS: i.SETTINGS,
        LIST: i.LIST,
      }})
    }
    return undefined
  }

}
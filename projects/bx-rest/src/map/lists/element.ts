import {
  iBXRestHttpListsElement,
  iBXRestListsElement
} from '../../typification/rest/lists/element/get'
import { toNum } from '../../services/base'

export default class BXRestMapListsElement {

  static get(items: iBXRestHttpListsElement[] | undefined): iBXRestListsElement[] | undefined {
    return (items)
      ? items.map(item => Object.assign(item, {
        BP_PUBLISHED: item.BP_PUBLISHED === 'Y',
        CREATED_BY: toNum(item.CREATED_BY),
        IBLOCK_ID: toNum(item.IBLOCK_ID),
        ID: toNum(item.ID)
      }))
      : undefined
  }

}

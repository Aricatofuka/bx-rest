import { Injectable } from '@angular/core'
import { BaseMapServices } from '../base'
import {
  iBXRestHttpListsElement,
  iBXRestListsElement
} from '../../typification/rest/lists/element/get'

@Injectable({
  providedIn: 'root'
})
export default class BXRestMapListsElement extends BaseMapServices {

  get(items: iBXRestHttpListsElement[] | undefined): iBXRestListsElement[] | undefined {

    return (items)
      ? items.map(item => Object.assign(item, {
        BP_PUBLISHED: item.BP_PUBLISHED === 'Y',
        CREATED_BY: this.toNum(item.CREATED_BY),
        IBLOCK_ID: this.toNum(item.IBLOCK_ID),
        ID: this.toNum(item.ID)
      }))
      : undefined
  }

}

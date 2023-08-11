import { Injectable } from '@angular/core'
import BaseMapServices from '../base'
import {
  iBXRestHttpListsElement,
  iBXRestListsElement
} from '../../typification/rest/lists/element/get'

@Injectable({
  providedIn: 'root'
})
export default class BXRestListsElementMap extends BaseMapServices {

  get(item: iBXRestHttpListsElement): iBXRestListsElement
  {
    return Object.assign(item,{
      BP_PUBLISHED: item.BP_PUBLISHED === 'Y',
      CREATED_BY: this.toNum(item.CREATED_BY),
      IBLOCK_ID: this.toNum(item.IBLOCK_ID),
      ID: this.toNum(item.ID)
    })
  }

}

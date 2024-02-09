import { Injectable } from '@angular/core'
import { BXRestTaskItemUserField } from './item/userfield'

@Injectable({
  providedIn: 'root'
})
export class BXRestTaskItem {

  constructor(public userField: BXRestTaskItemUserField) {
  }

}
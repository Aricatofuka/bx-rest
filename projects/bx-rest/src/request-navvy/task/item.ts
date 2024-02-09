import { Injectable } from '@angular/core'
import { BXRestNavvyTaskItemUserField } from './item/userfield'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTaskItem {

  constructor(public userField: BXRestNavvyTaskItemUserField) {
  }

}
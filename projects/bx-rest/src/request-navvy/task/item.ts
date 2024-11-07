import { inject, Injectable } from '@angular/core'
import { BXRestNavvyTaskItemUserField } from './item/userfield'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTaskItem {
  public readonly userField = inject(BXRestNavvyTaskItemUserField)
}
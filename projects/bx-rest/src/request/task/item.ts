import { inject, Injectable } from '@angular/core'
import { BXRestTaskItemUserField } from './item/userfield'

@Injectable({
  providedIn: 'root'
})
export class BXRestTaskItem {
  public readonly userField = inject(BXRestTaskItemUserField)
}
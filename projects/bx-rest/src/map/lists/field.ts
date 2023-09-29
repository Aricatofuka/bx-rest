import { Injectable } from '@angular/core'
import { iBXRestFieldItem } from '../../typification/rest/lists/field/get'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapListsField {
  get(v: { [key: string]: iBXRestFieldItem } | undefined):iBXRestFieldItem[] | undefined {
    return (v) ? Object.values(v) : undefined
  }
}

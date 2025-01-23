import { iBXRestFieldItem } from '../../typification/rest/lists/field/get'

export class BXRestMapListsField {
  static get(v: Record<string, iBXRestFieldItem> | undefined):iBXRestFieldItem[] | undefined {
    return (v) ? Object.values(v) : undefined
  }
}

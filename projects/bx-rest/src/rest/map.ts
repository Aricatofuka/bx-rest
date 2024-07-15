import { Injectable } from '@angular/core'
import { BXRestMapLists } from '../map/lists'

@Injectable({
  providedIn: 'root'
})
export class BXRestMap {
  constructor(
    public lists: BXRestMapLists
  ) {
  }
}
import { inject, Injectable } from '@angular/core'
import { BXRestMapLists } from '../map/lists'

@Injectable({
  providedIn: 'root'
})
export class BXRestMap {
  public readonly lists = inject(BXRestMapLists)
}
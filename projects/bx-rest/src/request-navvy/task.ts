import { Injectable } from '@angular/core'
import { BXRestNavvyElapseditem } from './task/elapseditem'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTask {

  constructor(
    public elapseditem: BXRestNavvyElapseditem,
  ) {
  }

}

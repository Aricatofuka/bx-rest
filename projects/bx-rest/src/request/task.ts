import { Injectable } from '@angular/core'
import { BXRestElapseditem } from './task/elapseditem'

@Injectable({
  providedIn: 'root'
})
export class BXRestTask {

  constructor(
    public elapseditem: BXRestElapseditem,
  ) {
  }

}

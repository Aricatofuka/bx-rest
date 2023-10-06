import { Injectable } from '@angular/core'
import { BXRestTaskElapseditem } from './task/elapseditem'
import { BXRestTaskCommentItem } from './task/commentitem'

@Injectable({
  providedIn: 'root'
})
export class BXRestTask {

  constructor(
    public elapseditem: BXRestTaskElapseditem,
    public commentitem: BXRestTaskCommentItem
  ) {
  }

}

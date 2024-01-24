import { Injectable } from '@angular/core'
import { BXRestTaskElapsedItem } from './task/elapseditem'
import { BXRestTaskCommentItem } from './task/commentitem'
import { BXRestTaskPlanner } from './task/planner'

@Injectable({
  providedIn: 'root'
})
export class BXRestTask {

  constructor(
    public elapsedItem: BXRestTaskElapsedItem,
    public commentItem: BXRestTaskCommentItem,
    public planner: BXRestTaskPlanner
  ) {
  }

}

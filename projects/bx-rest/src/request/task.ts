import { Injectable } from '@angular/core'
import { BXRestTaskElapseditem } from './task/elapseditem'
import { BXRestTaskCommentItem } from './task/commentitem'
import { BXRestTaskPlanner } from './task/planner'

@Injectable({
  providedIn: 'root'
})
export class BXRestTask {

  constructor(
    public elapseditem: BXRestTaskElapseditem,
    public commentitem: BXRestTaskCommentItem,
    public planner: BXRestTaskPlanner
  ) {
  }

}

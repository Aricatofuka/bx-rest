import { Injectable } from '@angular/core'
import { BXRestNavvyElapsedItem } from './task/elapseditem'
import { BXRestNavvyTaskCommentItem } from './task/commentitem'
import { BXRestNavvyTaskPlanner } from './task/planner'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTask {

  constructor(
    public elapsedItem: BXRestNavvyElapsedItem,
    public commentItem: BXRestNavvyTaskCommentItem,
    public planner: BXRestNavvyTaskPlanner
  ) {
  }

}

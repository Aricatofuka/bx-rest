import { Injectable } from '@angular/core'
import { BXRestNavvyElapseditem } from './task/elapseditem'
import { BXRestNavvyTaskCommentItem } from './task/commentitem'
import { BXRestNavvyTaskPlanner } from './task/planner'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTask {

  constructor(
    public elapseditem: BXRestNavvyElapseditem,
    public commentitem: BXRestNavvyTaskCommentItem,
    public planner: BXRestNavvyTaskPlanner
  ) {
  }

}

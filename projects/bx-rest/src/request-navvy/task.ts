import { inject, Injectable } from '@angular/core'
import { BXRestNavvyElapsedItem } from './task/elapseditem'
import { BXRestNavvyTaskCommentItem } from './task/commentitem'
import { BXRestNavvyTaskPlanner } from './task/planner'
import { BXRestNavvyTaskItem } from './task/item'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTask {
  public readonly elapsedItem = inject(BXRestNavvyElapsedItem)
  public readonly commentItem = inject(BXRestNavvyTaskCommentItem)
  public readonly planner = inject(BXRestNavvyTaskPlanner)
  public readonly item = inject(BXRestNavvyTaskItem)
}

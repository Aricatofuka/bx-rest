import { inject, Injectable } from '@angular/core'
import { BXRestTaskElapsedItem } from './task/elapseditem'
import { BXRestTaskCommentItem } from './task/commentitem'
import { BXRestTaskPlanner } from './task/planner'
import { BXRestTaskItem } from './task/item'

@Injectable({
  providedIn: 'root'
})
export class BXRestTask {
  public readonly elapsedItem = inject(BXRestTaskElapsedItem)
  public readonly commentItem = inject(BXRestTaskCommentItem)
  public readonly planner = inject(BXRestTaskPlanner)
  public readonly item = inject(BXRestTaskItem)
}

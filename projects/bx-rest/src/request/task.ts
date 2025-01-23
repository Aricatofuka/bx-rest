import { BXRestTaskElapsedItem } from './task/elapseditem'
import { BXRestTaskCommentItem } from './task/commentitem'
import { BXRestTaskPlanner } from './task/planner'
import { BXRestTaskItem } from './task/item'

export class BXRestTask {
  public readonly elapsedItem = new BXRestTaskElapsedItem()
  public readonly commentItem = new BXRestTaskCommentItem()
  public readonly planner = new BXRestTaskPlanner()
  public readonly item = new BXRestTaskItem()
}

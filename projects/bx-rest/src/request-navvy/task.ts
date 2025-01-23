import { BXRestNavvyElapsedItem } from './task/elapseditem'
import { BXRestNavvyTaskCommentItem } from './task/commentitem'
import { BXRestNavvyTaskPlanner } from './task/planner'
import { BXRestNavvyTaskItem } from './task/item'

export class BXRestNavvyTask {
  public readonly elapsedItem = new BXRestNavvyElapsedItem()
  public readonly commentItem = new BXRestNavvyTaskCommentItem()
  public readonly planner = new BXRestNavvyTaskPlanner()
  public readonly item = new BXRestNavvyTaskItem()
}

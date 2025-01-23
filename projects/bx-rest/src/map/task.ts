import { BXRestMapTaskCommentItem } from './task/commentitem'
import { BXRestMapTaskElapsedItem } from './task/elapseditem'
import { BXRestMapTaskStage } from './task/stages'

export class BXRestMapTask {
  public readonly commentItem = new BXRestMapTaskCommentItem()
  public readonly elapsedItem = new BXRestMapTaskElapsedItem()
  public readonly stages = new BXRestMapTaskStage()
}

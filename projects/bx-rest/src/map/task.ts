import { BXRestMapTaskCommentItem } from './task/commentitem'
import { BXRestMapTaskElapseditem } from './task/elapseditem'
import { BXRestMapTaskStage } from './task/stages'
import { BXRestMapTaskResult } from './task/result'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapTask {
  constructor(
    public commentItem: BXRestMapTaskCommentItem,
    public elapsedItem: BXRestMapTaskElapseditem,
    public result: BXRestMapTaskResult,
    public stages: BXRestMapTaskStage
  ) {
  }
}

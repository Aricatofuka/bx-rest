import { BXRestMapTaskCommentItem } from './task/commentitem'
import { BXRestMapTaskElapsedItem } from './task/elapseditem'
import { BXRestMapTaskStage } from './task/stages'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapTask {
  constructor(
    public commentItem: BXRestMapTaskCommentItem,
    public elapsedItem: BXRestMapTaskElapsedItem,
    public stages: BXRestMapTaskStage
  ) {
  }
}

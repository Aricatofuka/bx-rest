import { BXRestMapTaskCommentItem } from './task/commentitem'
import { BXRestMapTaskElapsedItem } from './task/elapseditem'
import { BXRestMapTaskStage } from './task/stages'
import { inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapTask {
  public readonly commentItem = inject(BXRestMapTaskCommentItem)
  public readonly elapsedItem = inject(BXRestMapTaskElapsedItem)
  public readonly stages = inject(BXRestMapTaskStage)
}

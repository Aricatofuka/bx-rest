import { Injectable } from '@angular/core'
import { BXRestNavvyElapseditem } from './task/elapseditem'
import { BXRestNavvyTaskCommentItem } from './task/commentitem'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTask {

  constructor(
    public elapseditem: BXRestNavvyElapseditem,
    public commentitem: BXRestNavvyTaskCommentItem,
  ) {
  }

}

import { Injectable } from '@angular/core'
import { $add, $blogcomment, $log } from '../../consts/part-name-metods'

@Injectable({
  providedIn: 'root'
})
export class BXRestLogBlogComment {
  url = {
    add: [$log, $blogcomment, $add], //	Добавляет комментарий к сообщению Живой ленты
  }
}

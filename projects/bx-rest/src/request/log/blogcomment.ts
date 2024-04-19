import { Injectable } from '@angular/core'
import { $add, $blogcomment, $log } from '../../consts/part-name-methods'
import { methods } from '../../methods';

@Injectable({
  providedIn: 'root'
})
export class BXRestLogBlogComment {

  protected url = methods.log.blogcomment
}

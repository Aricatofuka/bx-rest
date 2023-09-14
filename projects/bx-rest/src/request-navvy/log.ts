import { Injectable } from '@angular/core'
import { BXRestNavvyLogBlogPost } from './log/blogpost'
import { BXRestNavvyLogBlogComment } from './log/blogcomment'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyLog {

  constructor(
    public blogPost: BXRestNavvyLogBlogPost,
    public blogComment: BXRestNavvyLogBlogComment
  ) {
  }

}

import { Injectable } from '@angular/core'
import { BXRestLogBlogPost } from './log/blogpost'
import { BXRestLogBlogComment } from './log/blogcomment'

@Injectable({
  providedIn: 'root'
})
export class BXRestLog {

  constructor(
    public blogPost: BXRestLogBlogPost,
    public blogComment: BXRestLogBlogComment
  ) {
  }

}

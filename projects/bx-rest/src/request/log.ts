import { inject, Injectable } from '@angular/core'
import { BXRestLogBlogPost } from './log/blogpost'
import { BXRestLogBlogComment } from './log/blogcomment'

@Injectable({
  providedIn: 'root'
})
export class BXRestLog {
  public readonly blogPost = inject(BXRestLogBlogPost)
  public readonly blogComment = inject(BXRestLogBlogComment)
}

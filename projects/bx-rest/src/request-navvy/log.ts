import { inject, Injectable } from '@angular/core'
import { BXRestNavvyLogBlogPost } from './log/blogpost'
import { BXRestNavvyLogBlogComment } from './log/blogcomment'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyLog {
  public readonly blogPost = inject(BXRestNavvyLogBlogPost)
  public readonly blogComment = inject(BXRestNavvyLogBlogComment)
}

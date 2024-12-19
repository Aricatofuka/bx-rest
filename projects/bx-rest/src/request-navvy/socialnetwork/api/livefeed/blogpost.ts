import { inject, Injectable } from '@angular/core'
import {
  BXRestNavvySocialNetWorkApiLiveFeedBlogPostImportant,
} from './blogpost/important'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvySocialNetWorkApiLiveFeedBlogPost {
  public readonly important = inject(BXRestNavvySocialNetWorkApiLiveFeedBlogPostImportant)
}
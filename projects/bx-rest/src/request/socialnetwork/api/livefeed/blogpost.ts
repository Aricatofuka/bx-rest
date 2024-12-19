import { inject, Injectable } from '@angular/core'
import {
  BXRestSocialNetWorkApiLiveFeedBlogPostImportant,
} from './blogpost/important'

@Injectable({
  providedIn: 'root'
})
export class BXRestSocialNetWorkApiLiveFeedBlogPost {
  public readonly important = inject(BXRestSocialNetWorkApiLiveFeedBlogPostImportant)
}
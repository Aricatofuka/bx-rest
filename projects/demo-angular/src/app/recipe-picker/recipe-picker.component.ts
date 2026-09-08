import { Component, EventEmitter, Output } from '@angular/core'
import { MatChipsModule } from '@angular/material/chips'
import { recipes, type Recipe } from 'bx-rest-demo-shared'

@Component({
  selector: 'app-recipe-picker',
  standalone: true,
  imports: [MatChipsModule],
  template: `
    <mat-chip-set class="recipe-picker">
      @for (recipe of recipes; track recipe.id) {
        <mat-chip [title]="recipe.description" (click)="pick.emit(recipe)">{{ recipe.title }}</mat-chip>
      }
    </mat-chip-set>
  `
})
export class RecipePickerComponent {
  readonly recipes = recipes
  @Output() pick = new EventEmitter<Recipe>()
}

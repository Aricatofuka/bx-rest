import { recipes, type Recipe } from 'bx-rest-demo-shared'

interface Props {
  onPick: (recipe: Recipe) => void
}

export function RecipePicker({ onPick }: Props) {
  return (
    <div className="recipe-picker">
      {recipes.map(recipe => (
        <button
          key={recipe.id}
          type="button"
          className="recipe-picker__item"
          title={recipe.description}
          onClick={() => onPick(recipe)}
        >
          {recipe.title}
        </button>
      ))}
    </div>
  )
}

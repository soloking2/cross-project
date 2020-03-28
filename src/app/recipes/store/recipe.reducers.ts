import { Recipe } from '../recipe.model';
import * as fromAction from './recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: []
};

export function recipeReducer(state: RecipeState = initialState, action: fromAction.RecipeAction) {
  switch (action.type) {
    case fromAction.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case fromAction.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

      case fromAction.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.updateRecipe
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
        };

      case fromAction.DELETE_RECIPE:
        return {
          ...state,
          recipes: state.recipes.filter((recipes, index) =>  index !== action.payload)
        };
    default:
      return state;
  }
}

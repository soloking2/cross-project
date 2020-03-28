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
        ...state
      };
    default:
      return state;
  }
}

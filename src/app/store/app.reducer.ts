import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromRecipe from '../recipes/store/recipe.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppinglist: fromShoppingList.ShoppingListState;
  auth: fromAuth.IUser;
  recipe: fromRecipe.RecipeState;
}

export const appReducers: ActionReducerMap<AppState> = {
  shoppinglist: fromShoppingList.ShoppingListReducer,
  auth: fromAuth.userReducer,
  recipe: fromRecipe.recipeReducer
};

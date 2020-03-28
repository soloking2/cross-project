import { Ingredient } from 'src/app/shared/ingredient.model';
import * as fromActions from './shopping-list.actions';
import { createFeatureSelector, State, createSelector } from '@ngrx/store';

export interface ShoppingListState {
  addIngredient: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}


const initialState: ShoppingListState = {
  addIngredient: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)],
    editedIngredient: null,
    editedIngredientIndex: -1
};

const getShoppingListFeature = createFeatureSelector<ShoppingListState>('shoppinglist');

export const getIngredients = createSelector(
  getShoppingListFeature,
  (state: ShoppingListState) => state.addIngredient
);


export function ShoppingListReducer(state: ShoppingListState = initialState, action: fromActions.ShoppingListActions) {
  switch (action.type) {
    case fromActions.ADD_INGREDIENT:
      return {
        ...state,
        addIngredient: [...state.addIngredient, action.payload]
      };
    case fromActions.ADD_INGREDIENTS:
      return  {
        ...state,
        addIngredient: [...state.addIngredient, ...action.payload]
      };
    case fromActions.UPDATE_INGREDIENT:
      const ingredient = state.addIngredient[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.addIngredient];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        addIngredient: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case fromActions.DELETE_INGREDIENT:
      const deleteIngredient = state.addIngredient.filter((ig, igIndex) => {
        return igIndex !== state.editedIngredientIndex;
      });
      return {
        ...state,
        addIngredient: deleteIngredient,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case fromActions.START_EDITING:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.addIngredient[action.payload]}
      };

    case fromActions.STOP_EDITING:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}


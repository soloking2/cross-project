import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromRecipeActions from '../store/recipe.actions';
import { switchMap, map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class RecipeEffects {

  constructor(private actions$: Actions,
              private http: HttpClient) {}

  @Effect()
  fetchRecipes$ = this.actions$.pipe(
    ofType(fromRecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>('https://training-202.firebaseio.com/recipes.json');
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }
  ),
  map((recipe) => {
    return new fromRecipeActions.SetRecipes(recipe);
  })
  );

}

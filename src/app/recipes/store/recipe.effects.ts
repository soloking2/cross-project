import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromRecipeActions from '../store/recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()

export class RecipeEffects {

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {}

  @Effect()
  fetchRecipes$ = this.actions$.pipe(
    ofType(fromRecipeActions.FETCH_RECIPES),
    switchMap((actions: fromRecipeActions.FetchRecipes) => {
      return this.http.get<Recipe[]>('https://training-202.firebaseio.com/recipes.json');
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }
  ),
  map((recipe) => {
    return new fromRecipeActions.SetRecipes(recipe);
  })
  );


  @Effect({dispatch: false})
  storeRecipes$ = this.actions$.pipe(
    ofType(fromRecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put('https://training-202.firebaseio.com/recipes.json', recipesState.recipes);
    })
  );

}

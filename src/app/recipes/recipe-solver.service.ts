import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducer';
import * as fromRecipeActions from '../recipes/store/recipe.actions';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private recipeService: RecipeService,
              private store: Store<fromApp.AppState>,
              private actions$: Actions) {}

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  return this.store.select('recipe').pipe(
    take(1),
    map(recipeState => {
      return recipeState.recipes;
    }),
    switchMap(recipes => {
      if (recipes.length === 0) {
        this.store.dispatch(new fromRecipeActions.FetchRecipes());
        return this.actions$.pipe(
          ofType(fromRecipeActions.SET_RECIPES),
          take(1)
        );
      } else {
        return of(recipes);
      }
    })
  );


}
}

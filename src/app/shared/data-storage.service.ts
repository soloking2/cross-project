import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient} from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromRecipeActions from '../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  constructor(private recipeService: RecipeService,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://training-202.firebaseio.com/recipes.json', recipes).subscribe(
      (response) => console.log(response)
    );
  }

  fetchRecipe() {
      return this.http.get<Recipe[]>('https://training-202.firebaseio.com/recipes.json').pipe(
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }
    ),
    tap(recipes => this.store.dispatch(new fromRecipeActions.SetRecipes(recipes))
    ));
  }
}

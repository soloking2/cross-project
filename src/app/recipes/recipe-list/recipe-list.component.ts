import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as fromRecipeAction from '../store/recipe.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipeListSub: Subscription;
  constructor(private recipeService: RecipeService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('recipe').pipe(
      map(recipeData => recipeData.recipes)
    ).subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  ngOnDestroy() {

  }

}

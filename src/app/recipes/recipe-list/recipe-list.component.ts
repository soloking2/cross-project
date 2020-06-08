import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';

import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  constructor(private store: Store<fromApp.AppState>) { }

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

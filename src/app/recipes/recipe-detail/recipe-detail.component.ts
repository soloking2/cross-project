import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as fromActions from '../../shopping-list/store/shopping-list.actions';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
receipeSelected: Recipe;
id: number;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => {
        // tslint:disable-next-line: no-string-literal
        return +params['id'];
      }), switchMap(id => {
        this.id = id;
        return this.store.select('recipe');
      }),
      map(
        (recipeState) => {
          return recipeState.recipes.find(
            (recipe, index) => {
              return index === this.id;
            }
          );
        }
      )
    ).subscribe(
          recipe => {
            this.receipeSelected = recipe;
          }
        );
  }

  addToShoppingList() {
    this.store.dispatch(new fromActions.AddIngredients(this.receipeSelected.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});

  }

  onDelete() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['recipe']);
  }

}

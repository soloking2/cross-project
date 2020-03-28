import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  selectedRecipe = new Subject<Recipe[]>();

private recipe: Recipe[] = [];
  constructor() { }

  setRecipes(recipe: Recipe[]) {
    this.recipe = recipe;
    this.selectedRecipe.next(this.recipe.slice());
  }
  getRecipes() {
    return this.recipe.slice();
  }

  getRecipe(index: number) {
    return this.recipe[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipe.push(recipe);
    this.selectedRecipe.next(this.recipe.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipe[index] = newRecipe;
    this.selectedRecipe.next(this.recipe.slice());
  }

  deleteRecipe(index: number) {
    this.recipe.splice(index, 1);
    this.selectedRecipe.next(this.recipe.slice());
  }
}

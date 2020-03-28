import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  templateUrl: './recipes.component.html'
})

export class RecipeComponent implements OnInit {
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
  }
}

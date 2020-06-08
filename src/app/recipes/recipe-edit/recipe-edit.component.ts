import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, UrlTree } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


import { CanDeactivateComponent } from 'src/app/shared/component.guard';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, CanDeactivateComponent, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  storeSub: Subscription;
  // tslint:disable-next-line: no-inferrable-types
  isDirty: boolean = true;

  get ingredients(): FormArray {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    return <FormArray> this.recipeForm.get('ingredients');
  }
  constructor(private route: ActivatedRoute,
              private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        // tslint:disable-next-line: no-string-literal
        this.id = +params['id'];
        // tslint:disable-next-line: no-string-literal
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  submit() {
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe(
        {index: this.id,
          updateRecipe: this.recipeForm.value}));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.isDirty = false;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    if (this.recipeForm.dirty && !this.isDirty) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  onAddIngredient() {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    (<FormArray> this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)] )
      })
    );
  }

  onDeleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // tslint:disable-next-line: prefer-const
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      this.storeSub = this.store.select('recipe').pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      ).subscribe(
        recipe => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;

          if (recipe.ingredients) {
            // tslint:disable-next-line: prefer-const
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              }));
            }
          }
        }
      );


      this.recipeForm = new FormGroup({
        name: new FormControl(recipeName, [Validators.required]),
        imagePath: new FormControl(recipeImagePath, Validators.required),
        description: new FormControl(recipeDescription, Validators.required),
        ingredients: recipeIngredients
      });
    } else {
    this.recipeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      imagePath: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ingredients: recipeIngredients
    });
    }
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }


}

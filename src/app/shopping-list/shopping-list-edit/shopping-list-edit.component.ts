import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as fromShoppingActions from '../store/shopping-list.actions';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingForm') shopForm: NgForm;
  editSub: Subscription;
  editedIngredient: Ingredient;
  editMode = false;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.editSub = this.store.select('shoppinglist').subscribe(
      stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedIngredient = stateData.editedIngredient;
          this.shopForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount
          });
        } else {
          this.editMode = false;
        }
        }
    );
  }

  addShopList(item: NgForm) {
    if (item.valid) {
      const igName = item.value.name;
      const igAmount = item.value.amount;
      const newIngredient = new Ingredient(igName, igAmount);
      if (this.editMode) {
        this.store.dispatch(new fromShoppingActions.UpdateIngredient(newIngredient));
      } else {
      // this.shoppingService.addItem(newIngredient);
      this.store.dispatch(new fromShoppingActions.AddIngredient(newIngredient));
      }
    }
    this.editMode = false;
    item.reset();
  }

  onDelete() {
    // this.shoppingService.deleteItem(this.itemEdited);
    this.store.dispatch(new fromShoppingActions.DeleteIngredient());
    this.onClear();
  }

  onClear() {
    this.shopForm.reset();
    this.editMode = false;
    this.store.dispatch(new fromShoppingActions.StopEditing());
  }

  ngOnDestroy() {
    this.editSub.unsubscribe();
    this.store.dispatch(new fromShoppingActions.StopEditing());
  }

}

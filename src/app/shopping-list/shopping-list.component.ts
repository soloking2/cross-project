import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromReducers from './store/shopping-list.reducers';
import * as fromActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients: Observable<Ingredient[]>;
id: number;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.pipe(select(fromReducers.getIngredients));
  }

  onEdit(index: number) {
    this.store.dispatch(new fromActions.StartEditing(index));
  }

}

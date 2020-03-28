import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';
import * as fromAuthActions from '../auth/store/auth.actions';
import * as fromRecipeActions from '../recipes/store/recipe.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(
      user => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      }
    );
  }

  onSaveRecipe() {
    this.store.dispatch(new fromRecipeActions.StoreRecipes());
  }

  onFetchRecipe() {
    this.store.dispatch(new fromRecipeActions.FetchRecipes());
  }

  onLogOut() {
    this.store.dispatch(new fromAuthActions.LogOutUSer());
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}

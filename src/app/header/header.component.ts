import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';
import * as fromAuthActions from '../auth/store/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authSub: Subscription;
  constructor(private dataStorage: DataStorageService, private store: Store<fromApp.AppState>) { }

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
    this.dataStorage.storeRecipes();
  }

  onFetchRecipe() {
    this.dataStorage.fetchRecipe().subscribe();
  }

  onLogOut() {
    this.store.dispatch(new fromAuthActions.LogOutUSer());
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as fromActions from './store/auth.actions';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class AuthService {
  private tokenExpirationTimer: any;
constructor(private store: Store<fromApp.AppState>) {}


setLogoutTime(expirationDuration: number) {
  this.tokenExpirationTimer = setTimeout(() => {
    this.store.dispatch(new fromActions.LogOutUSer());
  }, expirationDuration);
}

clearLogoutTime() {
  if (this.tokenExpirationTimer) {
    clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }
}

}

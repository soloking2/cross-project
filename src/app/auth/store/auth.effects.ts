import { Injectable } from '@angular/core';
import * as fromActions from './auth.actions';
import {Actions, Effect, ofType} from '@ngrx/effects';

import { switchMap, catchError, map, tap, exhaustMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new fromActions.AuthenticationSuccess({
              email,
              userId,
              token,
              expirationDate, redirect: true});
};

const handleError = (errorRes) => {
  let errorMessage = 'An unknown error occurred';
  if (!errorRes.error || !errorRes.error.error) {
  return of(new fromActions.AuthenticationFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
  case 'EMAIL_EXISTS':
    errorMessage = 'This email exists already';
    break;
  case 'EMAIL_NOT_FOUND':
    errorMessage = 'This email does not exist';
    break;
  case 'INVALID_PASSWORD':
    errorMessage = 'This password is not correct';
    break;
}
  return of(new fromActions.AuthenticationFail(errorMessage));
};

@Injectable()
export class AuthEffects {

  constructor(private action$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {}

  @Effect()
  authLogin$ = this.action$.pipe(
    ofType((fromActions.LOGIN_START)),
    switchMap((actions: fromActions.LoginInUser) => {
      const loginData = {email: actions.payload.email, password: actions.payload.password, returnSecureToken: true};
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseKey, loginData).pipe(
          tap(resData => {
            this.authService.setLogoutTime(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })

  );

  @Effect({dispatch: false})
  authNavigate$ = this.action$.pipe(
    ofType(fromActions.AUTHENTICATE_SUCCESS),
    tap((actions: fromActions.AuthenticationSuccess) => {
      if (actions.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect({dispatch: false})
  authLogout$ = this.action$.pipe(
    ofType(fromActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTime();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  autoLogin$ = this.action$.pipe(
    ofType(fromActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return {type: 'SOMETHING'};
      }

      const loadedUser = new User(
        userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
         const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
         this.authService.setLogoutTime(expirationDuration);
         return new fromActions.AuthenticationSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        });
      }
      return {type: 'SOMETHING'};
    })
  );

  @Effect()
  authSignup$ = this.action$.pipe(
    ofType(fromActions.SIGNUP_START),
    switchMap((actions: fromActions.SignUpUSer) => {
      const postData = {email: actions.payload.email, password: actions.payload.password, returnSecureToken: true};
      return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseKey,
    postData).pipe(
      tap(resData => {
        this.authService.setLogoutTime(+resData.expiresIn * 1000);
      }),
      map(resData => {
        return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
      }),
      catchError((errorRes) => {
        return handleError(errorRes);
      })
    );
    })
  );


}

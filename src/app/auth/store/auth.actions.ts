import { Action } from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = '[Auth] Login Start';
export const LOGIN_START = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class AuthenticationSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(public payload: {
    email: string,
    userId: string,
    token: string,
    expirationDate: Date,
    redirect: boolean
  }) {}
}

export class LogOutUSer implements Action {
  readonly type = LOGOUT;
}

export class LoginInUser implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: {email: string, password: string}) {}
}

export class AuthenticationFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export class SignUpUSer implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: {email: string, password: string}) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type UserAction = AuthenticationSuccess
| LogOutUSer
| LoginInUser
| AuthenticationFail
| SignUpUSer
| ClearError
| AutoLogin;

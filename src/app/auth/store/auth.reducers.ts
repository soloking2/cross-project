import { User } from '../user.model';
import * as fromAction from './auth.actions';

export interface IUser {
  user: User;
  authError: string;
  isLoading: boolean;
}

const initUser: IUser = {
  user: null,
  authError: null,
  isLoading: false
};

export function userReducer(state: IUser = initUser, action: fromAction.UserAction) {
  switch (action.type) {
    case fromAction.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user,
        isLoading: false
      };
      case fromAction.LOGIN_START:
      case fromAction.SIGNUP_START:
        return {
          ...state,
          authError: null,
          isLoading: true
        };
      case fromAction.AUTHENTICATE_FAIL:
        return {
          ...state,
          user: null,
          authError: action.payload,
          isLoading: false
        };
      case fromAction.LOGOUT:
        return {
          ...state,
          user: null,
          authError: null,
        };
      case fromAction.CLEAR_ERROR:
        return {
          ...state,
          authError: null
        };

    default:
      return state;
  }
}


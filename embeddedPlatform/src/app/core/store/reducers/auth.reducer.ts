import { createFeatureSelector, on, createReducer, Action } from '@ngrx/store';
import * as fromActions from '../actions/auth.actions';
import { User } from 'oidc-client';
import { IUserProfile } from '../../models/auth/user-profile.model';
import { AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  authenticated: boolean;
  user: User;
  profile: IUserProfile;
  roles: string[];
  history: string[]
}

export const authInitialState: AuthState = {
    authenticated: false,
    user: null,
    profile: null,
    roles: [],
    history: []
};

const authReducer = createReducer(
    authInitialState,
    on(fromActions.loadFromStorageSuccess, (state, {user}) => ({
      ...state,
      authenticated: true,
      user,
      profile: user?.profile as IUserProfile,
      roles: (user?.profile as IUserProfile).ada_roles?.length ? (user?.profile as IUserProfile).ada_roles.split(',') : [],
      history: [...state.history, AuthActionTypes.LOAD_FROM_STORAGE_SUCCESS]
    })),
    on(fromActions.loadFromStorageFail, (state) => ({
      ...state,
      authenticated: false,
      user: null,
      profile: null,
      roles: [],
      history: [...state.history, AuthActionTypes.LOAD_FROM_STORAGE_FAILED]
    })),
    on(fromActions.loginSuccess, (state, {user}) => ({
      ...state,
      authenticated: true,
      user,
      profile: user?.profile as IUserProfile,
      roles: (user?.profile as IUserProfile).ada_roles?.length ? (user?.profile as IUserProfile).ada_roles.split(',') : [],
      history: [...state.history, AuthActionTypes.SIGN_IN_SUCCESS]
    })),
    on(fromActions.loginFail, (state) => ({
      ...state,
      authenticated: false,
      user: null,
      profile: null,
      roles: [],
      history: [...state.history, AuthActionTypes.SIGN_IN_FAILED]
    })),
    on(fromActions.logoutSuccess, (state) => ({
      ...state,
      authenticated: false,
      user: null,
      profile: null,
      roles: [],
      history: [...state.history, AuthActionTypes.SIGN_OUT_SUCCESS]
    })),
    on(fromActions.logoutFail, (state) => ({
      ...state,
      authenticated: false,
      user: null,
      profile: null,
      roles: [],
      history: [...state.history, AuthActionTypes.SIGN_OUT_FAILED]
    })),
    on(fromActions.refreshSuccess, (state, {user}) => ({
      ...state,
      authenticated: true,
      user,
      profile: user?.profile as IUserProfile,
      roles: (user?.profile as IUserProfile).ada_roles?.length ? (user?.profile as IUserProfile).ada_roles.split(',') : [],
      history: [...state.history, AuthActionTypes.REFRESH_SUCCESS]
    })),
    on(fromActions.refreshFail, (state) => ({
      ...state,
      history: [...state.history, AuthActionTypes.REFRESH_FAILED]
    })),
    on(fromActions.sessionExpired, (state) => ({
      ...state,
      authenticated: false,
      user: null,
      profile: null,
      roles: [],
      history: [...state.history, AuthActionTypes.SESSION_EXPIRED]
    })),

);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}

// Helpers
export const getIsLoggedAuthState = (state: AuthState) => state.authenticated && !state.user?.expired;
export const getUserAuthState = (state: AuthState) => state.user;
export const getProfileAuthState = (state: AuthState) => state.profile;
export const getNameAuthState = (state: AuthState) => state.profile?.name;
export const getRolesAuthState = (state: AuthState) => state.roles;
export const getHistoryAuthState = (state: AuthState) => state.history;

// Feature Selector
export const getAuthState = createFeatureSelector<AuthState>('auth');

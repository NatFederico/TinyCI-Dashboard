import { props, createAction } from '@ngrx/store';
import { User } from 'oidc-client';

export enum AuthActionTypes {
    LOAD_FROM_STORAGE_SUCCESS = '[Auth] Load user from storage success',
    LOAD_FROM_STORAGE_FAILED = '[Auth] Load user from storage failed',
    SIGN_IN_SUCCESS = '[Auth] Sign in success',
    SIGN_IN_FAILED = '[Auth] Sign in failed',
    SIGN_OUT_SUCCESS = '[Auth] Sign out success',
    SIGN_OUT_FAILED = '[Auth] Sign out failed',
    REFRESH_SUCCESS = '[Auth] Refresh success',
    REFRESH_FAILED = '[Auth] Refresh failed',
    SESSION_EXPIRED = '[Auth] Session expired'
}

export const loadFromStorageSuccess = createAction(
    AuthActionTypes.LOAD_FROM_STORAGE_SUCCESS,
    props<{user: User}>()
);

export const loadFromStorageFail = createAction(
    AuthActionTypes.LOAD_FROM_STORAGE_FAILED
);

export const loginSuccess = createAction(
    AuthActionTypes.SIGN_IN_SUCCESS,
    props<{user: User}>()
);

export const loginFail = createAction(
    AuthActionTypes.SIGN_IN_FAILED
);

export const logoutSuccess = createAction(
    AuthActionTypes.SIGN_OUT_SUCCESS,
);

export const logoutFail = createAction(
    AuthActionTypes.SIGN_OUT_FAILED
);

export const refreshSuccess = createAction(
    AuthActionTypes.REFRESH_SUCCESS,
    props<{user: User}>()
);

export const refreshFail = createAction(
    AuthActionTypes.REFRESH_FAILED
);

export const sessionExpired = createAction(
    AuthActionTypes.SESSION_EXPIRED
);


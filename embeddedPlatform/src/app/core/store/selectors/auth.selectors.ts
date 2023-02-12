import { createSelector } from '@ngrx/store';

import * as fromAuthReducer from '../reducers/auth.reducer';

export const getIsLogged = createSelector(
  fromAuthReducer.getAuthState,
  fromAuthReducer.getIsLoggedAuthState
  );

export const getUser = createSelector(
  fromAuthReducer.getAuthState,
  fromAuthReducer.getUserAuthState
);

export const getProfile = createSelector(
  fromAuthReducer.getAuthState,
  fromAuthReducer.getProfileAuthState
);

export const getName = createSelector(
  fromAuthReducer.getAuthState,
  fromAuthReducer.getNameAuthState
);

export const getRoles = createSelector(
  fromAuthReducer.getAuthState,
  fromAuthReducer.getRolesAuthState
);

export const getHistory = createSelector(
  fromAuthReducer.getAuthState,
  fromAuthReducer.getHistoryAuthState
);


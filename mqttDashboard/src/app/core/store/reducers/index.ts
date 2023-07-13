import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthReducer from './auth.reducer';


export interface CoreState {
    auth: fromAuthReducer.AuthState;
}

export const coreReducers: ActionReducerMap<CoreState> = {
    auth: fromAuthReducer.reducer
};

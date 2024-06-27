
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import { CartState, cartReducer } from './reducers/cart.reducer';
import { CartEffects } from './effects/cart.effect';

export interface AppState {
  cart: CartState;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: cartReducer,
};

export const effects: any[] = [CartEffects];

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

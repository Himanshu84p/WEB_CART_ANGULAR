import { createReducer, on } from '@ngrx/store';
import * as CartAction from '../actions/cart.action';

export interface CartState {
  items: any[];
  loading: boolean;
  error: any;
  
}

export const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialState,
  on(
    CartAction.fetchCart,
    CartAction.addProductToCart,
    CartAction.removeProductFromCart,
    CartAction.incrementProductQuantity,
    CartAction.decrementProductQuantity,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(CartAction.fetchCartSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
  })),
  on(CartAction.deleteCart, (state) => ({
    ...state,
    items :[],
    loading: false,
  })),
  on(CartAction.addProductToCartSuccess, (state, { productId, quantity }) => ({
    ...state,
    items: state.items.map((item) =>
      item.productId._id === productId ? { ...item, quantity } : item
    ),
    loading: false,
  })),
  on(CartAction.removeProductFromCartSuccess, (state, { productId }) => ({
    ...state,
    items: state.items.filter((item) => item.productId._id !== productId),
    loading: false,
  })),
  on(
    CartAction.updateProductQuantitySuccess,
    (state, { productId, quantity }) => ({
      ...state,
      items: state.items.map((item) =>
        item.productId._id === productId ? { ...item, quantity } : item
      ),
      loading: false,
    })
  ),
  on(CartAction.incrementProductQuantitySuccess, (state, { productId }) => ({
    ...state,
    items: state.items.map((item) =>
      item.productId._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ),
    loading: false,
  })),
  on(CartAction.decrementProductQuantitySuccess, (state, { productId }) => ({
    ...state,
    items: state.items.map((item) =>
      item.productId._id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ),
    loading: false,
  })),
  on(CartAction.cartError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

import { createAction, props } from '@ngrx/store';

export const addProductToCart = createAction(
  '[Cart] Add Product',
  props<{ productId: string; quantity: number }>()
);

export const removeProductFromCart = createAction(
  '[Cart] Remove Product',
  props<{ productId: string }>()
);

export const fetchCart = createAction('[Cart] Fetch Cart');

export const deleteCart = createAction('[Cart] Delete Cart');

export const incrementProductQuantity = createAction(
  '[Cart] Increment Product Quantity',
  props<{ productId: string; quantity: number }>()
);

export const incrementProductQuantitySuccess = createAction(
  '[Cart] Increment Product Quantity Success',
  props<{ productId: string }>()
);

export const decrementProductQuantity = createAction(
  '[Cart] Decrement Product Quantity',
  props<{ productId: string; quantity: number }>()
);

export const decrementProductQuantitySuccess = createAction(
  '[Cart] Decrement Product Quantity Success',
  props<{ productId: string }>()
);

export const fetchCartSuccess = createAction(
  '[Cart] Fetch Cart Success',
  props<{ items: any[] }>()
);

export const addProductToCartSuccess = createAction(
  '[Cart] Add Product Success',
  props<{ items: any[] }>()
);

export const removeProductFromCartSuccess = createAction(
  '[Cart] Remove Product Success',
  props<{ productId: string }>()
);

export const updateProductQuantitySuccess = createAction(
  '[Cart] Update Product Quantity Success',
  props<{ productId: string; quantity: number }>()
);

export const cartError = createAction('[Cart] Error', props<{ error: any }>());

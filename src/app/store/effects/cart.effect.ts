import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CartAction from '../actions/cart.action';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private cartService: CartService) {}

  fetchCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartAction.fetchCart),
      mergeMap(() =>
        this.cartService.fetchCart().pipe(
          map((items) => CartAction.fetchCartSuccess({ items })),
          catchError((error) => of(CartAction.cartError({ error })))
        )
      )
    )
  );

  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartAction.addProductToCart),
      mergeMap(({ productId, quantity }) =>
        this.cartService.addItemToCart(productId, quantity).pipe(
          map((items) => {
            return CartAction.addProductToCartSuccess({ items });
          }),
          catchError((error) => of(CartAction.cartError({ error })))
        )
      )
    )
  );

  removeProductFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartAction.removeProductFromCart),
      mergeMap(({ productId }) =>
        this.cartService.removeItemFromCart(productId).pipe(
          map(() => {
            return CartAction.removeProductFromCartSuccess({ productId });
          }),
          catchError((error) => of(CartAction.cartError({ error })))
        )
      )
    )
  );

  incrementProductQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartAction.incrementProductQuantity),
      mergeMap(({ productId, quantity }) =>
        this.cartService.updateQuantity(productId,quantity).pipe(
          map(() => CartAction.incrementProductQuantitySuccess({ productId})),
          catchError(error => of(CartAction.cartError({ error })))
        )
      )
    )
  );
  decrementProductQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartAction.decrementProductQuantity),
      mergeMap(({ productId, quantity }) =>
        this.cartService.updateQuantity(productId,quantity).pipe(
          map(() => CartAction.decrementProductQuantitySuccess({ productId})),
          catchError(error => of(CartAction.cartError({ error })))
        )
      )
    )
  );

  // incrementProductQuantity$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CartActions.incrementProductQuantity),
  //     mergeMap(({ productId }) =>
  //       this.cartService.updateQuantity(productId).pipe(
  //         map(() => CartActions.incrementProductQuantitySuccess({ productId })),
  //         catchError((error) => of(CartActions.cartError({ error })))
  //       )
  //     )
  //   )
  // );

  // decrementProductQuantity$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CartActions.decrementProductQuantity),
  //     mergeMap(({ productId }) =>
  //       this.cartService.decrementProductQuantity(productId).pipe(
  //         map(() => CartActions.decrementProductQuantitySuccess({ productId })),
  //         catchError((error) => of(CartActions.cartError({ error })))
  //       )
  //     )
  //   )
  // );
}

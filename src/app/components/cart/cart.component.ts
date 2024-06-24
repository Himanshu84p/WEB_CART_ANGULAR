import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { CartState } from '../../store/reducers/cart.reducer';
import * as CartAction from '../../store/actions/cart.action';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  subtotal$: Observable<number>;

  constructor(private store: Store<{ cart: CartState }>) {
    this.cart$ = this.store
      .select((state) => state.cart.items)
      .pipe(tap((cart) => console.log('Cart Items:', cart)));
    this.loading$ = this.store
      .select((state) => state.cart.loading)
      .pipe(tap((loading) => console.log('Loading:', loading)));
    this.error$ = this.store
      .select((state) => state.cart.error)
      .pipe(tap((error) => console.log('Error:', error)));
    this.subtotal$ = this.cart$.pipe(
      map((items) =>
        items.reduce(
          (sum: any, item: any) => sum + item.price * item.quantity,
          0,
          console.log('')
        )
      )
    );
  }

  ngOnInit(): void {
    this.store.dispatch(CartAction.fetchCart());
    console.log('cart', this.cart$);
  }

  removeProduct(productId: string): void {
    this.store.dispatch(CartAction.removeProductFromCart({ productId }));
  }

  incrementQuantity(productId: string, quantity: number): void {
    console.log('button clicked increment');
    this.store.dispatch(
      CartAction.incrementProductQuantity({ productId, quantity })
    );
  }

  decrementQuantity(productId: string, quantity: number): void {
    this.store.dispatch(
      CartAction.decrementProductQuantity({ productId, quantity })
    );
  }
}

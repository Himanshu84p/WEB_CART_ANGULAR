import { Component, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { CartState } from '../../store/reducers/cart.reducer';
import { Store } from '@ngrx/store';
import * as CartAction from '../../store/actions/cart.action';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [FormsModule, AsyncPipe, CurrencyPipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
  cart$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  subtotal$: Observable<number>;

  private cartService = inject(CartService);
  private toast = inject(HotToastService);

  constructor(
    private store: Store<{ cart: CartState }>,
    private router: Router
  ) {
    this.cart$ = this.store
      .select((state) => state.cart.items)
      .pipe(tap((cart) => console.log('Cart Items in order summary:', cart)));
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

  //function to complete confirm order
  confirmOrder() {
    const cartId = localStorage.getItem('cartId')
    this.cartService.decreaseStockQuantity(cartId!).subscribe((response: any) => {
      console.log('response from order', response)
      if (response.success) {
        localStorage.removeItem('cartId')
        this.cartService.deleteCart().subscribe((response: any) => {
          if (response.success) {
            this.toast.info('Order SuccessFully Placed');
            this.router.navigateByUrl('/dashboard/home');
            console.log('response ', response);
          } else {
            this.toast.error('Error in placing the order');
          }
        });
      } else {
        console.log('order status', response.message)
        this.toast.error(response.message)
      }
    })


    this.store.dispatch(CartAction.deleteCart());
  }
}

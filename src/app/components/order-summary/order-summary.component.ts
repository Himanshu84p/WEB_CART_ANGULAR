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

  confirmOrder() {
    this.cartService.deleteCart().subscribe((response: any) => {
      this.toast.info('Order SuccessFully Placed');
      this.router.navigateByUrl('/dashboard/home');
      console.log("response ",response)
    });

    this.store.dispatch(
      CartAction.deleteCart()
    );
  }
}

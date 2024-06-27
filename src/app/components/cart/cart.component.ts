import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { CartState } from '../../store/reducers/cart.reducer';
import * as CartAction from '../../store/actions/cart.action';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule,LoaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  subtotal$: Observable<number>;
  itemOutofStock: boolean = false;

  private toast = inject(HotToastService);

  constructor(
    private store: Store<{ cart: CartState }>,
    private router: Router
  ) {
    this.cart$ = this.store
      .select((state) => state.cart.items)
      .pipe(tap((cart) => console.log('Cart Items in cart component:', cart)));
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
    console.log('cart in cart component', this.cart$);
    this.cart$.subscribe((cart) => {
      cart.map((item : any) => {
        if(item.productId.stock === 0) {
          this.itemOutofStock = true
        }
      })
    })
  }

  //---------------------methods for operations in cart-----------------------------
  removeProduct(productId: string): void {
    this.cart$.subscribe((cart) => {
      cart.map((item : any) => {
        if(item.productId.stock === 0) {
          this.itemOutofStock = true
        } else {
          this.itemOutofStock = false
        }
      })
    })
    this.toast.success('Product Removed from cart');
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
  //redirect to checkout on completion
  handleCheckout() {
    if(this.itemOutofStock) {
      this.toast.warning("A Product Out of stock remove first to checkout!!")
    } else {
      this.router.navigate(['/dashboard/checkout']);
    }
  }
}

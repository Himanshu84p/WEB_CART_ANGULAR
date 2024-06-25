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
  }

  removeProduct(productId: string): void {
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

  handleCheckout() {
    this.router.navigate(['/dashboard/checkout']);
  }
}
// import { CommonModule } from '@angular/common';
// import { Component, OnInit, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Store } from '@ngrx/store';
// import { Observable, of } from 'rxjs';
// import { catchError, filter, map, tap } from 'rxjs/operators'; // Import necessary operators
// import { CartState } from '../../store/reducers/cart.reducer';
// import * as CartAction from '../../store/actions/cart.action';
// import { Router } from '@angular/router';
// import { HotToastService } from '@ngxpert/hot-toast';

// @Component({
//   selector: 'app-cart',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css'],
// })
// export class CartComponent implements OnInit {
//   cart$: Observable<any[]>;
//   loading$: Observable<boolean>;
//   error$: Observable<any>;
//   subtotal$: Observable<number>;

//   private toast = inject(HotToastService);

//   constructor(
//     private store: Store<{ cart: CartState }>,
//     private router: Router
//   ) {
//     // Initialize observables to select data from the store
//     this.cart$ = this.store
//       .select((state) => state.cart.items)
//       .pipe(
//         tap((cart) => console.log('Cart Items:', cart)),
//         filter((items) => Array.isArray(items)) // Filter out non-array items
//       );

//     this.loading$ = this.store.select((state) => state.cart.loading);
//     this.error$ = this.store.select((state) => state.cart.error);

//     // Calculate the subtotal directly from the cart items
//     this.subtotal$ = this.cart$.pipe(
//       map((items) =>
//         items.reduce(
//           (sum: number, item: any) => sum + item.price * item.quantity,
//           0
//         )
//       ),
//       catchError(() => of(0)) // Handle error if items is not an array
//     );
//   }

//   ngOnInit(): void {
//     // Dispatch action to fetch cart items on initialization
//     this.store.dispatch(CartAction.fetchCart());
//     console.log('Component initialized, cart observable:', this.cart$);
//   }

//   removeProduct(productId: string): void {
//     this.toast.success('Product Removed from cart');
//     this.store.dispatch(CartAction.removeProductFromCart({ productId }));
//   }

//   incrementQuantity(productId: string, quantity: number): void {
//     if (quantity > 0) {
//       this.store.dispatch(
//         CartAction.incrementProductQuantity({ productId, quantity })
//       );
//     }
//   }

//   decrementQuantity(productId: string, quantity: number): void {
//     if (quantity > 0) {
//       this.store.dispatch(
//         CartAction.decrementProductQuantity({ productId, quantity })
//       );
//     }
//   }

//   handleCheckout(): void {
//     this.router.navigate(['/dashboard/checkout']);
//   }
// }

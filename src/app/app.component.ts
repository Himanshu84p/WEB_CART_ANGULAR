import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from './form/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { RouterLink } from '@angular/router';
import { SignUpComponent } from './form/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ErrorComponent } from './error/error.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CartState } from './store/reducers/cart.reducer';
import { Observable, tap } from 'rxjs';
import * as CartAction from './store/actions/cart.action';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SignInComponent,
    HomeComponent,
    RouterLink,
    SignUpComponent,
    HttpClientModule,
    ErrorComponent,
    CommonModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  title = 'WEB_CART_ANGULAR';
  cart$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<any>;


  constructor(
    private store: Store<{ cart: CartState }>
  ) {
    this.cart$ = this.store
      .select((state) => state.cart.items)
      .pipe(tap((cart) => console.log('Cart Items in main layout:', cart)));
    this.loading$ = this.store
      .select((state) => state.cart.loading)
      .pipe(tap((loading) => console.log('Loading:', loading)));
    this.error$ = this.store
      .select((state) => state.cart.error)
      .pipe(tap((error) => console.log('Error:', error)));
  }
  ngOnInit(): void {
    this.store.dispatch(CartAction.fetchCart());
    this.cart$.subscribe((length) => {
      console.log('length in cart', length)
    })
    console.log('cart in main component', this.cart$);
  }
}

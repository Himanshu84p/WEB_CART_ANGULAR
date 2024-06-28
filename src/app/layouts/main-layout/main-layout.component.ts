import { Component, OnInit, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { CommonModule } from '@angular/common';
import { Observable, filter, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CartState } from '../../store/reducers/cart.reducer';
import * as CartAction from '../../store/actions/cart.action';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLinkActive,
    RouterLink,
    LoaderComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  cart$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  currUser: any = {};
  //service for toast
  private toastService = inject(HotToastService);

  constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store<{ cart: CartState }>
  ) {
    if (authService.isLoggedIn()) {
      this.currUser = JSON.parse(localStorage.getItem('user') || '{}');
      console.log('curr user', this.currUser);
    }
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

  //for logout the user
  logout() {
    this.authService.logout();
    this.toastService.success('Logged Out Successfully!!');
    this.router.navigateByUrl('auth/login');
    localStorage.removeItem('cartId')
  }
}

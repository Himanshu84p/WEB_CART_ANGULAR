import { Routes } from '@angular/router';
import { SignUpComponent } from './form/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './guard/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SignInComponent } from './form/sign-in/sign-in.component';
import { ErrorComponent } from './error/error.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
      },
      {
        path: 'products',
        component: ProductListComponent,
        title: 'Products',
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Cart',
      },
      {
        path: '**',
        component: ErrorComponent,
        title: 'Unauthorized',
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: SignInComponent, title: 'SignIn' },
      { path: 'register', component: SignUpComponent, title: 'SignUp' },
      {
        path: '**',
        component: ErrorComponent,
        title: 'Unauthorized',
      },
    ],
  },
];

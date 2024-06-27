import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HotToastService } from '@ngxpert/hot-toast';
import { Observable, tap } from 'rxjs';
import { CartState } from '../../store/reducers/cart.reducer';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent implements OnInit {
  cart$: Observable<any>;
  name: string = '';
  address: string = '';
  paymentMethod: string = '';
  isProductOutOfStock: boolean = false

  constructor(private router: Router, private toast: HotToastService, private store: Store<{ cart: CartState }>) {
    this.cart$ = this.store
      .select((state) => state.cart.items)
      .pipe(tap((cart) => console.log('Cart Items in cart component:', cart)));
  }

  ngOnInit(): void {
    this.cart$.subscribe((cart) => {
      cart.map((item: any) => {
        if (item.productId.stock === 0) {
          console.log('item', item)
          this.isProductOutOfStock = true
        }
      })
      if (this.isProductOutOfStock) {
        console.log('123123123123123')
        this.router.navigateByUrl('/dashboard/cart')
      }
    })

  }

  submitOrderForm() {
    if (this.name && this.address && this.paymentMethod) {
      this.router.navigate(['/dashboard/order-summary'], {
        queryParams: {
          name: this.name,
          address: this.address,
          paymentMethod: this.paymentMethod,
        },
      });
    } else {
      this.toast.error('All Fields Are required')
    }
  }
}

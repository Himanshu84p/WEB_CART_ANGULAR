import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartState } from '../../store/reducers/cart.reducer';
import * as CartAction from '../../store/actions/cart.action';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatIcon, MatCardContent, MatCard, MatCardActions],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private store: Store<{ cart: CartState }>,

    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    console.log('ngon init');
  }

  fetchProducts() {
    setTimeout(() => {
      this.productService.getAllProducts().subscribe(
        (data: any) => {
          console.log('data from fetching', data);
          this.products = data.data;
        },
        (error: any) => {
          console.error('Error fetching products:', error);
        }
      );
    }, 500);
  }

  addToCart(productId: string): void {
    this.toast.success("Product Added to cart")
    this.store.dispatch(
      CartAction.addProductToCart({ productId, quantity: 1 })
    );
  }

  seeProductDetails(id: string) {
    this.router.navigate(['/dashboard/products', id]);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartState } from '../../store/reducers/cart.reducer';
import { HotToastService } from '@ngxpert/hot-toast';
import * as CartAction from '../../store/actions/cart.action';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId: any = '';
  productService = inject(ProductService);
  toast = inject(HotToastService);
  isLoading : boolean = true

  product: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ cart: CartState }>
  ) {}

  fetchProduct(productId: string) {
    setTimeout(() => {
      this.productService.getOneProduct(productId).subscribe(
        (data: any) => {
          console.log('data from fetching one product', data);
          this.product = data.data[0];
          this.isLoading = false
        },
        (error: any) => {
          console.error('Error fetching products:', error);
          this.isLoading = false
        }
      );
    },100);
  }

  addToCart(productId: string): void {
    this.toast.success('Product Added to cart');
    this.store.dispatch(
      CartAction.addProductToCart({ productId, quantity: 1 })
    );
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.fetchProduct(this.productId);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
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
  cart$: Observable<any>;
  productId: any = '';
  productService = inject(ProductService);
  toast = inject(HotToastService);
  isLoading : boolean = true

  product: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ cart: CartState }>
  ) {
    this.cart$ = this.store
      .select((state) => state.cart.items)
      .pipe(tap((cart) => console.log('Cart Items in cart component:', cart)));
  }

  //fetch one product from pramatere id
  fetchProduct(productId: string) {
    setTimeout(() => {
      //service call to get product
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

  //function to add cart 
  addToCart(productId: string, stock: number): void {
    let product:any[] = [];
    let productInCart:any[] = [];
    this.cart$.subscribe((cart) => {
      console.log('products in cart', cart)
      productInCart = cart.filter((product: any) => product.productId._id === productId)
    })
    if (productInCart.length !== 0) {
      this.cart$.subscribe((cart) => {
        product = cart.filter((product: any) => product.quantity + 1 > stock)
      })
    }
    console.log('pfffffffffffffffffffffff>>>>>>>',product ,productInCart)
    if (product.length !== 0 && productInCart.length !== 0) {
      this.toast.warning("Max product stock exceed")
    } else {
      this.toast.success('Product added to cart');
      this.store.dispatch(
        CartAction.addProductToCart({ productId, quantity: 1 })
      )
    }
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.fetchProduct(this.productId);
  }
}


import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartState } from '../../store/reducers/cart.reducer';
import * as CartAction from '../../store/actions/cart.action';
import { HotToastService } from '@ngxpert/hot-toast';
import { LoaderComponent } from '../loader/loader.component';
import { FormsModule } from '@angular/forms';
import { Observable, tap, map, filter } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatCardContent,
    MatCard,
    MatCardActions,
    RouterLink,
    LoaderComponent,
    FormsModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  cart$: Observable<any>;
  products: any[] = [];
  filteredProducts: any[] = [];
  isLoading: boolean = true;
  error: string = '';
  searchTerm: string = '';
  selectedPriceRange: string = '';
  selectedRating: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private store: Store<{ cart: CartState }>,
    private toast: HotToastService
  ) {
    this.cart$ = this.store
      .select((state) => state.cart.items)
      .pipe(tap((cart) => console.log('Cart Items in cart component:', cart)));
  }

  ngOnInit(): void {
    this.fetchProducts();
    this.store.dispatch(CartAction.fetchCart());
    console.log('ngOnInit');
  }

  fetchProducts() {
    setTimeout(() => {
      this.productService.getAllProducts().subscribe(
        (data: any) => {
          console.log('Data from fetching', data);
          this.products = data.data;
          this.filteredProducts = this.products; // Initially display all products
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching products:', error);
          this.isLoading = false;
          this.error = 'Server Error in fetching data';
        }
      );
    }, 500);
  }

  addToCart(productId: string, stock: number): void {
    let product:any[] = [];
    let productInCart:any[] = [];
    this.cart$.subscribe((cart) => {
      console.log('products in cart', cart)
      productInCart = cart.filter((product: any) => product.productId._id === productId)
    })
    if (productInCart.length !== 0) {
      this.cart$.subscribe((cart) => {
        product = cart.filter((product: any) => product.productId._id === productId && product.quantity == stock)
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

  seeProductDetails(id: string) {
    this.router.navigate(['/dashboard/products', id]);
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) => {
      const matchesSearch = this.searchTerm
        ? product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const [minPrice, maxPrice] = this.selectedPriceRange
        ? this.selectedPriceRange.split('-').map(Number)
        : [null, null];
      const matchesMinPrice =
        minPrice !== null ? product.price >= minPrice : true;
      const matchesMaxPrice =
        maxPrice !== null ? product.price <= maxPrice : true;

      const minRating = this.selectedRating
        ? Number(this.selectedRating)
        : null;
      const matchesMinRating =
        minRating !== null ? product.rating >= minRating : true;

      return (
        matchesSearch && matchesMinPrice && matchesMaxPrice && matchesMinRating
      );
    });
  }
}

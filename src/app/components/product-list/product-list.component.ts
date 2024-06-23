import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatIcon, MatCardContent, MatCard, MatCardActions],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
    console.log('ngon init');
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        console.log('data', data);
        this.products = data.data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addToCart(product: any): void {
    // Implement your add to cart functionality here
  }
}

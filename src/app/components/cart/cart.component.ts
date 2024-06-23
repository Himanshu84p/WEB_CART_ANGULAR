import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: any[] = [
    { id: 2, name: 'Product 2', price: 20, quantity: 1 },
    { id: 3, name: 'Product 3', price: 30, quantity: 1 },
    { id: 1, name: 'Product 1', price: 10, quantity: 1 },
  ];

  getTotalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  getTotalItems(): number {
    return this.cartItems.length;
  }

  clearCart() {
    this.cartItems = [];
  }

  removeFromCart(index: number) {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
    }
  }

  updateQuantity(index: number, quantity: number) {
    if (index >= 0 && index < this.cartItems.length && quantity >= 1) {
      this.cartItems[index].quantity = quantity;
    }
  }
}

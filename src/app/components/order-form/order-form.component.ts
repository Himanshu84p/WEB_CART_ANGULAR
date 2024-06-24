import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  name: string = '';
  address: string = '';
  paymentMethod: string = '';

  constructor(private router: Router, private toast : HotToastService) {}

  submitOrderForm() {
    if (this.name && this.address && this.paymentMethod) {
      this.router.navigate(['/dashboard/order-summary'], {
        queryParams: {
          name: this.name,
          address: this.address,
          paymentMethod: this.paymentMethod
        }
      });
    } else {
      this.toast.error('All Fields Are required')
    }
  }
}

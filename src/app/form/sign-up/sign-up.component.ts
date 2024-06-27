import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { HotToastService } from '@ngxpert/hot-toast';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  form: FormGroup;
  isSubmitted = false;
  hide = true;
  //defining constructor for form using formbuilder
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  //service for toast
  private toastService = inject(HotToastService);
  //function which returns the control : for reusability
  getUserFormControl(value: string) {
    return this.form.controls[value];
  }

  //method for validating the form
  validateForm() {
    return {
      name: this.getUserFormControl('name'),
      username: this.getUserFormControl('username'),
      email: this.getUserFormControl('email'),
      phoneNumber: this.getUserFormControl('phoneNumber'),
      gender: this.getUserFormControl('gender'),
      password: this.getUserFormControl('password'),
    };
  }
  //toast message functions
  showSuccessToast(message: string) {
    this.toastService.success(message);
  }
  showErrorToast(message: string) {
    this.toastService.error(message);
  }

  //on submit function checks the valid form input or not
  onSubmit() {
    try {
      this.isSubmitted = true;
      if (this.form.valid) {
        this.toastService.loading('Saving Data....', { id: 'sign_up' });
        this.authService.register(this.form.value).subscribe(
          (response) => {
            console.log('Registration successful', response);
            this.toastService.close('sign_up');
            this.showSuccessToast('Signup SuccessFully');
            this.router.navigateByUrl('auth/login');
          },
          (error) => {
            console.log('Registration failed', error);
            this.toastService.close('sign_up');
            this.showErrorToast(error.error.message);
          }
        );
        console.log('Form Submitted and data is here', this.form.value);
      } else {
        console.log('Error in submitting form data');
      }
    } catch (error) {
      throw error;
    }
  }
}

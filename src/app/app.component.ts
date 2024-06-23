import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from './form/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { RouterLink } from '@angular/router';
import { SignUpComponent } from './form/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ErrorComponent } from './error/error.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SignInComponent,
    HomeComponent,
    RouterLink,
    SignUpComponent,
    HttpClientModule,
    ErrorComponent,
    CommonModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService]
})
export class AppComponent {
  title = 'WEB_CART_ANGULAR';
}

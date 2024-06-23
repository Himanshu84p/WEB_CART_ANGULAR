import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {
  router = inject(Router);

  constructor() {
    const loggedIn = localStorage.getItem('accessToken');

    if (loggedIn != null) {
      console.log('loggedInAuth', loggedIn);
      this.router.navigateByUrl('/dashboard');
    }
  }
}

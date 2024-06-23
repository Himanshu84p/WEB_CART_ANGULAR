import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  currUser: any = {};
  //service for toast
  private toastService = inject(HotToastService);

  constructor(public authService: AuthService, private router: Router) {
    if (authService.isLoggedIn()) {
      this.currUser = JSON.parse(localStorage.getItem('user') || '{}');
      console.log('curr user', this.currUser);
    }
  }

  //for logout the user
  logout() {
    this.authService.logout();
    this.toastService.success('Logged Out Successfully!!');
    this.router.navigateByUrl('auth/login');
  }
}

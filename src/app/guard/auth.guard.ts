import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)

  const loggedIn = localStorage.getItem('accessToken')

  if (loggedIn != null) {
    return true
  } else {
    router.navigateByUrl('auth/login')
    return false
  }
};

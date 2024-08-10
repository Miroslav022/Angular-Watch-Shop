import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const adminpanelGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    const tokenData = authService.getJwtTokenData();
    if (tokenData.Username === 'Admin') {
      return true;
    } else {
      router.navigate(['/home']);
      return false;
    }
  } else {
    router.navigate(['/home']);
    return false;
  }
};

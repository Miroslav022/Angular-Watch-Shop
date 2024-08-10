import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderedProductsService } from '../services/ordered-products.service';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authCart = inject(CartService);
  const authOrderService = inject(OrderedProductsService);
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};

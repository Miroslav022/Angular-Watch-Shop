import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderedProductsService } from '../services/ordered-products.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authCart = inject(CartService);
  const authOrderService = inject(OrderedProductsService);
  const router = inject(Router);

  if (authCart.hasProducts()) {
    return true;
  } else if (authOrderService.orderConfirmed()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};

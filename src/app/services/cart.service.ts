import { Injectable } from '@angular/core';
import { IProductInCart } from '../cart/interfaces/i-product-in-cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  private cartSubject = new BehaviorSubject<IProductInCart[]>([]);
  cart = this.cartSubject.asObservable();

  setCart(product: IProductInCart[]): void {
    this.cartSubject.next(product);
  }
  removeAllFromCart(): void {
    this.cartSubject.next([]);
  }
  hasProducts(): boolean {
    return this.cartSubject.getValue().length > 0;
  }
}

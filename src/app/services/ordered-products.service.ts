import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProductInCart } from '../cart/interfaces/i-product-in-cart';
import { IShippingAddress } from '../checkout/interfaces/i-shipping-address';

@Injectable({
  providedIn: 'root',
})
export class OrderedProductsService {
  constructor() {}
  private orderedProductSubject = new BehaviorSubject<IProductInCart[]>([]);
  private shippingAddressSubject = new BehaviorSubject<IShippingAddress>({
    street: '',
    city: '',
    country: '',
    zipCode: 0,
  });
  orderedProducts = this.orderedProductSubject.asObservable();
  shippingAddress = this.shippingAddressSubject.asObservable();

  setOrderedProducts(
    orderedProduct: IProductInCart[],
    shippingAddress: IShippingAddress
  ): void {
    this.orderedProductSubject.next(orderedProduct);
    this.shippingAddressSubject.next(shippingAddress);
  }

  orderConfirmed(): boolean {
    return this.orderedProductSubject.getValue().length > 0;
  }
}

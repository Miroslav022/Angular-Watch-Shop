import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IProductInCart } from '../cart/interfaces/i-product-in-cart';
import { IShippingAddress } from '../checkout/interfaces/i-shipping-address';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserOrdersResponse } from '../my-orders/interfaces/imy-orders';
import { AuthService } from './auth.service';
import { IAddLocation } from '../checkout/interfaces/IAddLocation';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderedProductsService {
  constructor(
    private _http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}
  private orderedProductSubject = new BehaviorSubject<IProductInCart[]>([]);
  private locationAddedSubject = new BehaviorSubject<boolean>(false);
  private locationAddedFailedSubject = new BehaviorSubject<boolean>(false);
  private shippingAddressSubject = new BehaviorSubject<IShippingAddress>({
    street: '',
    city: '',
    country: '',
    zipCode: 0,
  });
  orderedProducts = this.orderedProductSubject.asObservable();
  shippingAddress = this.shippingAddressSubject.asObservable();
  locationAdded$ = this.locationAddedSubject.asObservable();
  locationAddedFailed$ = this.locationAddedFailedSubject.asObservable();

  setOrderedProducts(
    orderedProduct: IProductInCart[],
    shippingAddress: IShippingAddress
  ): void {
    this.orderedProductSubject.next(orderedProduct);
    this.shippingAddressSubject.next(shippingAddress);
  }
  orderProduct(id: number) {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.log('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this._http
      .post<{ cartId: number }>(
        'https://localhost:7174/api/orders',
        {
          cartId: id,
        },
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.router.navigateByUrl('/checkout/confirmation');
        },
        error: () => {
          console.log('error');
        },
      });
  }
  orderConfirmed(): boolean {
    return this.orderedProductSubject.getValue().length > 0;
  }

  userOrders(): Observable<UserOrdersResponse> {
    const token = this.authService.getJwtToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<UserOrdersResponse>(
      'https://localhost:7174/api/orders/myorders',
      { headers }
    );
  }

  addNewLocation(data: IAddLocation) {
    const token = this.authService.getJwtToken();
    if (!token) {
      console.log('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this._http
      .put<IAddLocation>(
        'https://localhost:7174/api/users/editlocation',
        data,
        { headers }
      )
      .subscribe({
        next: (response) => {
          this.locationAddedSubject.next(true);
          this.locationAddedFailedSubject.next(false);
        },
        error: (error) => {
          console.log('greska');
          this.locationAddedFailedSubject.next(true);
          this.locationAddedSubject.next(false);
        },
      });
  }
}

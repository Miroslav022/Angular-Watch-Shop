import { Injectable } from '@angular/core';
import { ICart, IProductInCart } from '../cart/interfaces/i-product-in-cart';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _http: HttpClient, private authService: AuthService) {}
  private cartSubject = new BehaviorSubject<IProductInCart>({
    priceId: 0,
    quantity: 0,
  });
  cart = this.cartSubject.asObservable();

  setCart(product: IProductInCart): void {
    this._http
      .post<{ priceId: number; quantity: number }>(
        'https://localhost:7174/api/cart',
        product
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: () => {
          console.log('error');
        },
      });
  }

  getCart(): Observable<ICart> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.log('No token found');
      return throwError('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get<ICart>('https://localhost:7174/api/cart/usercart', {
      headers,
    });
  }

  UpdateCart(data: any) {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.log('No token found');
      return throwError('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http
      .patch('https://localhost:7174/api/cartitems', data, {
        headers,
      })
      .subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error),
      });
  }
  removeItemFromCart(id: number): void {
    const token = this.authService.getJwtToken;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this._http
      .delete('https://localhost:7174/api/cartitems/' + id, { headers })
      .subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error),
      });
  }

  removeAllFromCart() {}
  hasProducts(): boolean {
    // return this.cartSubject.getValue().length > 0;
    return false;
  }
}

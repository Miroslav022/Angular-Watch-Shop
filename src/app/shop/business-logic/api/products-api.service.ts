import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of } from 'rxjs';
import { IProduct, IProductPagination } from '../../interfaces/iproduct';
import { AuthService } from '../../../services/auth.service';
import { IEditProduct } from '../../../admin-panel/products/Interfaces/IEditProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private isFailedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  isFailed: Observable<boolean> = this.isFailedSubject.asObservable();
  constructor(public http: HttpClient, private authService: AuthService) {}

  getAll(page: number = 1): Observable<IProductPagination> {
    return this.http.get<IProductPagination>(
      'https://localhost:7174/api/products?page=' + page
    );
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>('https://localhost:7174/api/products/' + id);
  }

  addProduct(data: any) {
    const token = this.authService.getJwtToken();
    if (!token) {
      console.log('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .post('https://localhost:7174/api/products', data, { headers })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          this.isFailedSubject.next(true);
        },
      });
  }

  getProductById(id: number): Observable<IProduct | undefined> {
    return this.http.get<IProduct>(`https://localhost:7174/api/products/${id}`);
  }

  updateProduct(data: IEditProduct) {
    const token = this.authService.getJwtToken();
    if (!token) {
      console.log('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put('https://localhost:7174/api/products', data, {
      headers,
    });
  }

  deleteProduct(id: number) {
    const token = this.authService.getJwtToken();
    if (!token) {
      console.log('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .patch(
        'https://localhost:7174/api/products',
        { id: id },
        {
          headers,
        }
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => console.log(error),
      });
  }
}

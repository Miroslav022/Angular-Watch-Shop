import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { IProduct } from '../../interfaces/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  constructor(public http: HttpClient) {}

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('assets/jsons/products.json');
  }
  getProductById(id: number): Observable<IProduct | undefined> {
    return this.getAll().pipe(
      map((products: IProduct[]) =>
        products.find((product) => product.id === id)
      ),
      catchError((error) => {
        console.error('Error fetching product by ID:', error);
        return of(undefined);
      })
    );
  }
}

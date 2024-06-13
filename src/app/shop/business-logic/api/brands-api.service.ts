import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../../interfaces/ibrand';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsApiService {
  constructor(public http: HttpClient) {}
  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>('assets/jsons/brands.json');
  }
  getBrandById(id: number): Observable<IBrand | undefined> {
    return this.getBrands().pipe(
      map((categories: IBrand[]) =>
        categories.find((category) => category.id === id)
      ),
      catchError((error) => {
        console.error('Error fetching category by ID:', error);
        return of(undefined);
      })
    );
  }
}

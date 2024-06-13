import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ICategory } from '../../interfaces/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  constructor(public http: HttpClient) {}
  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('assets/jsons/categories.json');
  }
  getCategoryById(id: number): Observable<ICategory | undefined> {
    return this.getCategories().pipe(
      map((categories: ICategory[]) =>
        categories.find((category) => category.id === id)
      ),
      catchError((error) => {
        console.error('Error fetching category by ID:', error);
        return of(undefined);
      })
    );
  }
}

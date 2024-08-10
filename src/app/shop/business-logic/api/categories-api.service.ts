import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { ICategory, ICategoryPagination } from '../../interfaces/icategory';
import { INameItem } from '../../../Interfaces/INameItem';
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  private isFailedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  isFailed: Observable<boolean> = this.isFailedSubject.asObservable();

  constructor(public http: HttpClient, private authService: AuthService) {}
  getCategories(): Observable<ICategoryPagination> {
    return this.http.get<ICategoryPagination>(
      'https://localhost:7174/api/Categories'
    );
  }

  addNewCategory(data: INameItem) {
    const token = this.authService.getJwtToken();
    if (!token) {
      console.log('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .post<INameItem>('https://localhost:7174/api/categories', data, {
        headers,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => this.isFailedSubject.next(true),
      });
  }

  deleteCategory(id: number) {
    const token = this.authService.getJwtToken();
    if (!token) {
      console.log('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .patch(
        'https://localhost:7174/api/categories',
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

  getCategory(id: number): Observable<ICategory> {
    console.log(id);
    return this.http.get<ICategory>(
      'https://localhost:7174/api/categories/' + id
    );
  }
  update(data: ICategory) {
    const token = this.authService.getJwtToken();
    if (!token) {
      console.log('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<ICategory>(
      'https://localhost:7174/api/categories',
      data,
      {
        headers,
      }
    );
  }

  getCategoryById(id: number): Observable<ICategory | undefined> {
    return this.getCategories().pipe(
      map((categories: any) => {
        return categories.data.find((category: any) => category.id === id);
      }),
      catchError((error) => {
        console.error('Error fetching category by ID:', error);
        return of(undefined);
      })
    );
  }
}

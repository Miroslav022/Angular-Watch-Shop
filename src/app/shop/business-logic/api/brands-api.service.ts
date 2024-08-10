import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand, IBrandPagination } from '../../interfaces/ibrand';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { INameItem } from '../../../Interfaces/INameItem';

@Injectable({
  providedIn: 'root',
})
export class BrandsApiService {
  private isFailedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isFailed: Observable<boolean> = this.isFailedSubject.asObservable();

  constructor(public http: HttpClient, private authService: AuthService) {}
  getBrands(): Observable<IBrandPagination> {
    return this.http.get<IBrandPagination>('https://localhost:7174/api/brands');
  }

  addNewBrand(data: INameItem) {
    const token = this.authService.getJwtToken();
    if (!token) {
      console.log('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .post<INameItem>('https://localhost:7174/api/brands', data, {
        headers,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => this.isFailedSubject.next(true),
      });
  }

  deleteBrand(id: number) {
    const token = this.authService.getJwtToken();
    if (!token) {
      console.log('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .patch(
        'https://localhost:7174/api/brands',
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
  getBrand(id: number): Observable<IBrand> {
    return this.http.get<IBrand>('https://localhost:7174/api/brands/' + id);
  }
  update(data: IBrand) {
    const token = this.authService.getJwtToken();
    if (!token) {
      console.log('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<IBrand>('https://localhost:7174/api/brands', data, {
      headers,
    });
  }

  getBrandById(id: number): Observable<IBrand | undefined> {
    return this.getBrands().pipe(
      map((brands: any) => brands.data.find((brand: any) => brand.id === id)),
      catchError((error) => {
        console.error('Error fetching category by ID:', error);
        return of(undefined);
      })
    );
  }
}

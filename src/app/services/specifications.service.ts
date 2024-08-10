import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDataPagination } from '../Interfaces/IApiData';
import { IProductSpecification } from '../admin-panel/products/Interfaces/IProductSpecification';

@Injectable({
  providedIn: 'root',
})
export class SpecificationsService {
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllSpecifications(): Observable<IDataPagination> {
    return this.http.get<IDataPagination>(
      'https://localhost:7174/api/specifications'
    );
  }

  addProductSpecification(data: IProductSpecification) {
    const token = this.authService.getJwtToken();
    if (!token) {
      console.log('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<IProductSpecification>(
      'https://localhost:7174/api/productSpecifications',
      data,
      { headers }
    );
  }
  deleteProductSpecification(data: any) {
    const token = this.authService.getJwtToken();
    if (!token) {
      console.log('No token found');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(
      'https://localhost:7174/api/productSpecifications',
      {
        headers: headers,
        body: JSON.stringify(data),
      }
    );
  }
}

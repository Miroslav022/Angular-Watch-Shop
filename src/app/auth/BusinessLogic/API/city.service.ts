import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICityPagination } from '../../Interfaces/ICity';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private _http: HttpClient) {}
  getCities(): Observable<ICityPagination> {
    return this._http.get<ICityPagination>('https://localhost:7174/api/cities');
  }
}

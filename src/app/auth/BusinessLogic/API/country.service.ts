import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDataPagination } from '../../../Interfaces/IApiData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}
  getCountries(): Observable<IDataPagination> {
    return this.http.get<IDataPagination>(
      'https://localhost:7174/api/countries'
    );
  }
}

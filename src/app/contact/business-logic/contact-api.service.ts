import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  constructor(public http: HttpClient) {}
  insert(dataToSend: any): Observable<any> {
    return this.http.post('assets/jsons/messages.json', dataToSend);
  }
}

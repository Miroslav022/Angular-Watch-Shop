import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecension } from '../../Interfaces/irecension';
import { Token } from '@angular/compiler';
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RecensionsService {
  constructor(private _http: HttpClient, private atuhService: AuthService) {}
  deleteRecension(id: number) {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this._http
      .patch('https://localhost:7174/api/recensions', { id: id }, { headers })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => console.log(error),
      });
  }
  writeRecension(data: IRecension): void {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this._http
      .post('https://localhost:7174/api/recensions', data, { headers })
      .subscribe({
        next: (response: any) => {
          console.log('Recension submitted successfully', response);
        },
        error: (error: any) => {
          console.error('There was an error during sending data!', error);
        },
      });
  }
}

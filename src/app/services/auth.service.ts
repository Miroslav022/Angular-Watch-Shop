import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthResponse } from '../Interfaces/iauth-response';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public tokenData$: Observable<any> = this.tokenDataSubject.asObservable();

  private isFailedLogin: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isFailed$: Observable<boolean> = this.isFailedLogin.asObservable();

  constructor(private router: Router, private _http: HttpClient) {}
  getJwtToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  getJwtTokenData(): any {
    let token = this.getJwtToken();
    let jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token ?? '');
  }

  login(data: any): Observable<IAuthResponse> {
    return this._http.post<IAuthResponse>(
      'https://localhost:7174/api/auth',
      data
    );
  }

  setJwtToken(token: string): void {
    localStorage.setItem('jwtToken', token);
    this.tokenDataSubject.next(this.getJwtTokenData());
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.tokenDataSubject.next(null);
    this.router.navigateByUrl('/');
  }
}

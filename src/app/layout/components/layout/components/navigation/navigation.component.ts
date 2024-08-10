import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  username: string;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(private _authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.isLoggedIn = this._authService.isLoggedIn();
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this._authService.isLoggedIn();
      }
    });
    this._authService.tokenData$.subscribe((tokenData) => {
      if (tokenData) {
        this.username = tokenData.Username;
        this.isAdmin = tokenData.Username === 'Admin';
      } else {
        this.username = '';
        this.isAdmin = false;
      }
    });

    // Initial token data load
    const tokenData = this._authService.getJwtTokenData();
    if (tokenData) {
      this.username = tokenData.Username;
      this.isAdmin = tokenData.Username === 'Admin';
    }
  }
  logout(): void {
    this._authService.logout();
  }
}

interface ITokenData {
  Username: string;
}

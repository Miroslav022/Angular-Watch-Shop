import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isFailed: boolean = false;
  form: any = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
    private _router: Router
  ) {}

  runValidation(): void {
    Object.keys(this.form.controls).forEach((ctrlName) => {
      this.form.get(ctrlName).markAsTouched();
    });
  }
  ngOnInit(): void {
    this.runValidation();
    this._authService.isFailed$.subscribe((failed) => {
      this.isFailed = failed;
    });
  }

  onSubmit(): void {
    let data = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };
    this._authService.login(data).subscribe({
      next: (response: any) => {
        const token = response.token;
        this._authService.setJwtToken(token);
        this._router.navigateByUrl('/');
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}

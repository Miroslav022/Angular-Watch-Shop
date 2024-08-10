import { Component, OnInit } from '@angular/core';
// import { ICountry, ICountryPagination } from '../../Interfaces/ICountry';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDataApi, IDataPagination } from '../../../Interfaces/IApiData';
import { ICity, ICityPagination } from '../../Interfaces/ICity';
import { CountryService } from '../../BusinessLogic/API/country.service';
import { CityService } from '../../BusinessLogic/API/city.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent implements OnInit {
  Countries: IDataApi[] = [];
  Cities: ICity[] = [];
  FilteredCity: ICity[] = [];
  isRegistered: boolean = false;
  isFailed: boolean = false;
  isCityDisabled: boolean = true;

  form: any = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('0', [
      Validators.required,
      Validators.pattern(/^[1-9]*$/),
    ]),
    city: new FormControl({ value: '0', disabled: true }, [
      Validators.required,
      Validators.pattern(/^[1-9]*$/),
    ]),
    address: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private _countryService: CountryService,
    private _cityService: CityService
  ) {}

  runValidation(): void {
    Object.keys(this.form.controls).forEach((ctrlName) => {
      this.form.get(ctrlName).markAsTouched();
    });
  }
  ngOnInit(): void {
    this._countryService.getCountries().subscribe({
      next: (data) => {
        this.Countries = data.data.map((item) => ({
          id: item.id,
          name: item.name,
        }));
      },
      error: (error) => {
        console.error('There was an error' + error);
      },
    });

    this._cityService.getCities().subscribe({
      next: (data) => {
        this.Cities = data.data.map((item) => ({
          id: item.id,
          city: item.city,
          country: {
            id: item.country.id,
            name: item.country.name,
          },
        }));
      },
      error: (error) => {
        console.log('There was an error' + error);
      },
    });
    this.form.get('country').valueChanges.subscribe((value: any) => {
      if (value) {
        this.isCityDisabled = false;
        this.FilteredCity = this.Cities.filter(
          (city) => city.country.id === Number(this.form.get('country').value)
        );
        // console.log(this.form.get('country').value);
        // console.log(this.Cities);
        this.form.get('city').enable();
      } else {
        this.isCityDisabled = true;
        this.form.get('city').disable();
      }
    });
  }

  onSubmit(): void {
    let data = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      cityId: this.form.get('city')?.value,
      address: this.form.get('address')?.value,
      birthDate: this.form.get('birthDate')?.value,
      password: this.form.get('password')?.value,
      username: this.form.get('username')?.value,
    };

    this.http.post('https://localhost:7174/api/users', data).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        this.isRegistered = true;
      },
      error: (error) => {
        console.error('There was an error during registration!', error.error);
        this.isFailed = true;
        console.log(this.isFailed);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDataApi } from '../../../Interfaces/IApiData';
import { ICity } from '../../../auth/Interfaces/ICity';
import { CountryService } from '../../../auth/BusinessLogic/API/country.service';
import { CityService } from '../../../auth/BusinessLogic/API/city.service';
import { OrderedProductsService } from '../../../services/ordered-products.service';
import { IAddLocation } from '../../interfaces/IAddLocation';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.css',
})
export class AddLocationComponent implements OnInit {
  Countries: IDataApi[] = [];
  Cities: ICity[] = [];
  FilteredCity: ICity[] = [];
  isCityDisabled: boolean = true;
  isLocationAdded: boolean = false;
  isLocationFailed: boolean = false;
  form: any = new FormGroup({
    country: new FormControl('0', [
      Validators.required,
      Validators.pattern(/^[1-9]*$/),
    ]),
    city: new FormControl({ value: '0', disabled: true }, [
      Validators.required,
      Validators.pattern(/^[1-9]*$/),
    ]),
    address: new FormControl('', Validators.required),
  });
  constructor(
    private _countryService: CountryService,
    private _cityService: CityService,
    private _orderService: OrderedProductsService
  ) {}
  ngOnInit(): void {
    this.runValidation();
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
  fillForm(product: any): void {
    this.form.get('country').setValue(product.country);
    this.form.get('address').setValue(product.address);
    this.form.get('city').setValue(product.city);
  }

  addLocation() {
    const data: IAddLocation = {
      cityId: this.form.get('city').value,
      countryId: this.form.get('country').value,
      address: this.form.get('address').value,
    };
    this._orderService.addNewLocation(data);
    this._orderService.locationAdded$.subscribe({
      next: (data) => {
        console.log(data);
        this.isLocationAdded = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this._orderService.locationAddedFailed$.subscribe({
      next: (data) => {
        console.log(data);
        this.isLocationFailed = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  runValidation(): void {
    Object.keys(this.form.controls).forEach((ctrlName) => {
      this.form.get(ctrlName).markAsTouched();
    });
  }
}

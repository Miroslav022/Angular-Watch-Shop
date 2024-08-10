import { Component, OnInit } from '@angular/core';
import { BrandsApiService } from '../../../shop/business-logic/api/brands-api.service';
import { IBrand } from '../../../shop/interfaces/ibrand';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrl: './edit-brand.component.css',
})
export class EditBrandComponent implements OnInit {
  brand: IBrand;
  form: FormGroup;
  isSuccess: boolean = false;
  isFailed: boolean = false;
  id: number;
  constructor(
    private brandService: BrandsApiService,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      Name: new FormControl('', Validators.required),
    });
  }

  runValidation(): void {
    Object.keys(this.form.controls).forEach((ctrlName) => {
      this?.form?.get(ctrlName)?.markAsTouched();
    });
  }
  ngOnInit(): void {
    this.runValidation();
    this.id = Number(this.route.snapshot.paramMap.get('id') || 0);
    this.brandService.getBrand(this.id).subscribe({
      next: (response) => {
        this.brand = response;
        this.form.patchValue({
          Name: this.brand.brand,
        });
      },
      error: (error) => console.log(error),
    });
  }

  update() {
    const data = {
      id: this.id,
      brand: this.form.get('Name')?.value,
    };
    this.brandService.update(data).subscribe({
      next: (response) => {
        console.log(response);
        this.isSuccess = true;
      },
      error: (error) => {
        this.isFailed = true;
        console.log(error);
      },
    });
  }
}

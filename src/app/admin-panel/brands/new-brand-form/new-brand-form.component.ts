import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INameItem } from '../../../Interfaces/INameItem';
import { BrandsApiService } from '../../../shop/business-logic/api/brands-api.service';
import { IBrand } from '../../../shop/interfaces/ibrand';

@Component({
  selector: 'app-new-brand-form',
  templateUrl: './new-brand-form.component.html',
  styleUrl: './new-brand-form.component.css',
})
export class NewBrandFormComponent implements OnInit {
  isFailed: boolean = false;
  constructor(private brandService: BrandsApiService) {}

  @Output() brandAdded = new EventEmitter<boolean>();

  form: any = new FormGroup({
    Name: new FormControl('', Validators.required),
  });

  runValidation(): void {
    Object.keys(this.form.controls).forEach((ctrlName) => {
      this.form.get(ctrlName).markAsTouched();
    });
  }
  ngOnInit(): void {
    this.runValidation();
  }
  AddNewItem() {
    const data: INameItem = {
      name: this.form.get('Name').value,
    };
    this.brandService.addNewBrand(data);
    this.brandService.isFailed.subscribe((status) => {
      this.isFailed = status;
    });
    if (!this.isFailed) {
      this.brandAdded.emit(true);
    }
  }
}

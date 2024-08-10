import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesApiService } from '../../../shop/business-logic/api/categories-api.service';
import { INameItem } from '../../../Interfaces/INameItem';

@Component({
  selector: 'app-new-category-form',
  templateUrl: './new-category-form.component.html',
  styleUrl: './new-category-form.component.css',
})
export class NewCategoryFormComponent implements OnInit {
  isFailed: boolean = false;
  @Output() categoryAdded = new EventEmitter<boolean>();
  form: any = new FormGroup({
    Name: new FormControl('', Validators.required),
  });
  constructor(private categoryService: CategoriesApiService) {}

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
    this.categoryService.addNewCategory(data);
    this.categoryService.isFailed.subscribe((status) => {
      this.isFailed = status;
    });
    if (!this.isFailed) {
      this.categoryAdded.emit(true);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../../shop/interfaces/icategory';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesApiService } from '../../../shop/business-logic/api/categories-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent implements OnInit {
  category: ICategory;
  form: FormGroup;
  isSuccess: boolean = false;
  isFailed: boolean = false;
  id: number;
  constructor(
    private categoryService: CategoriesApiService,
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
    this.categoryService.getCategory(this.id).subscribe({
      next: (response) => {
        this.category = response;
        this.form.patchValue({
          Name: this.category.category,
        });
      },
      error: (error) => console.log(error),
    });
  }

  update() {
    const data = {
      id: this.id,
      category: this.form.get('Name')?.value,
    };
    this.categoryService.update(data).subscribe({
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

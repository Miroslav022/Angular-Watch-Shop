import { Component, OnInit } from '@angular/core';
import { ICategoryPagination } from '../../../shop/interfaces/icategory';
import { CategoriesApiService } from '../../../shop/business-logic/api/categories-api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories: ICategoryPagination;
  isVisible: boolean = false;
  constructor(private categoryService: CategoriesApiService) {}
  DisplayAddNewItemForm() {
    this.isVisible = !this.isVisible;
  }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id);
    this.categories.data = this.categories.data.filter((x) => x.id !== id);
  }
  onCategoryAdded(isAdded: boolean) {
    if (isAdded) {
      setTimeout(() => {
        this.categoryService.getCategories().subscribe({
          next: (response) => {
            console.log(response);
            this.categories = response;
          },
          error: (error) => {
            console.error(error);
          },
        });
      }, 100);
    }
  }
}

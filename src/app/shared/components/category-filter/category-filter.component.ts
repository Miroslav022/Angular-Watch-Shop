import { Component, OnInit } from '@angular/core';
import { CategoriesApiService } from '../../../shop/business-logic/api/categories-api.service';
import {
  ICategory,
  ICategoryPagination,
} from '../../../shop/interfaces/icategory';
import { FilteringService } from '../../../shop/business-logic/filtering/filtering.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css',
})
export class CategoryFilterComponent implements OnInit {
  selectedCategories: number[] = [];
  categories: ICategoryPagination;
  constructor(
    private categoryService: CategoriesApiService,
    private filteringService: FilteringService
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.filteringService.selectedCategories$.subscribe((categories) => {
      this.selectedCategories = categories;
    });
  }

  onCategoryChange(event: { id: number; checked: boolean }): void {
    if (event.checked) {
      this.selectedCategories.push(event.id);
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (id) => id !== event.id
      );
    }
    this.filteringService.setSelectedCategories(this.selectedCategories);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = {
          pages: data.pages,
          data: data?.data,
          currentPage: data.currentPage,
          totalCount: data.totalCount,
          perPage: data.perPage,
        };
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

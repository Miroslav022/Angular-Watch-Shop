import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { BrandsApiService } from '../../../shop/business-logic/api/brands-api.service';
import { IBrand } from '../../../shop/interfaces/ibrand';
import { CategoriesApiService } from '../../../shop/business-logic/api/categories-api.service';
import { ICategory } from '../../../shop/interfaces/icategory';
import { FilteringService } from '../../../shop/business-logic/filtering/filtering.service';
import { FilterButtonComponent } from '../filter-button/filter-button.component';

@Component({
  selector: 'app-filter-navigation',
  templateUrl: './filter-navigation.component.html',
  styleUrl: './filter-navigation.component.css',
})
export class FilterNavigationComponent implements OnInit {
  selectedSortOption: string = '';

  constructor(private filteringService: FilteringService) {}

  ngOnInit(): void {
    this.filteringService.selectedSort$.subscribe((sort) => {
      this.selectedSortOption = sort;
    });
  }
}

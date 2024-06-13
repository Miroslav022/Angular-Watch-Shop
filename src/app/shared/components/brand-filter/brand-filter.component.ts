import { Component, OnInit } from '@angular/core';
import { BrandsApiService } from '../../../shop/business-logic/api/brands-api.service';
import { IBrand } from '../../../shop/interfaces/ibrand';
import { FilteringService } from '../../../shop/business-logic/filtering/filtering.service';

@Component({
  selector: 'app-brand-filter',
  templateUrl: './brand-filter.component.html',
  styleUrl: './brand-filter.component.css',
})
export class BrandFilterComponent implements OnInit {
  selectedBrands: number[] = [];
  brands: IBrand[] = [];
  constructor(
    private brandService: BrandsApiService,
    private filteringService: FilteringService
  ) {}
  ngOnInit() {
    this.getBrands();
    this.filteringService.selectedBrands$.subscribe((brands) => {
      this.selectedBrands = brands;
    });
  }

  onBrandChange(event: { id: number; checked: boolean }): void {
    if (event.checked) {
      this.selectedBrands.push(event.id);
    } else {
      this.selectedBrands = this.selectedBrands.filter((id) => id !== event.id);
    }
    this.filteringService.setSelectedBrands(this.selectedBrands);
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe({
      next: (data) => {
        this.brands = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

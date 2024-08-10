import { Component, OnInit } from '@angular/core';
import { BrandsApiService } from '../../../shop/business-logic/api/brands-api.service';
import { IBrand, IBrandPagination } from '../../../shop/interfaces/ibrand';
import { INameItem } from '../../../Interfaces/INameItem';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
})
export class BrandComponent implements OnInit {
  brands: IBrandPagination;
  isVisible: boolean = false;
  constructor(private brandService: BrandsApiService) {}
  DisplayAddNewItemForm() {
    this.isVisible = !this.isVisible;
  }
  ngOnInit(): void {
    this.brandService.getBrands().subscribe({
      next: (response) => {
        console.log(response);
        this.brands = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteBrand(id: number) {
    this.brandService.deleteBrand(id);
    this.brands.data = this.brands.data.filter((x) => x.id !== id);
  }

  onBrandAdded(isAdded: boolean) {
    if (isAdded) {
      setTimeout(() => {
        this.brandService.getBrands().subscribe({
          next: (response) => {
            console.log(response);
            this.brands = response;
          },
          error: (error) => {
            console.error(error);
          },
        });
      }, 100);
    }
  }
}

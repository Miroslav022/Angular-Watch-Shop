import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ProductsApiService } from '../../business-logic/api/products-api.service';
import { IProduct, IProductPagination } from '../../interfaces/iproduct';
import { FilteringService } from '../../business-logic/filtering/filtering.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  constructor(
    private productService: ProductsApiService,
    private filterService: FilteringService
  ) {}
  products: IProductPagination;
  filteredProducts: IProduct[] = [];

  filteredBrands: number[] = [];
  filteredCategories: number[] = [];
  sortOption: string = '';
  search: string = '';

  isLoaded: boolean = false;

  ngOnInit() {
    this.getAllWatches();
    this.filterService.selectedBrands$.subscribe((brands) => {
      this.filteredBrands = brands;
      this.applyFilters();
    });
    this.filterService.selectedCategories$.subscribe((categories) => {
      this.filteredCategories = categories;
      this.applyFilters();
    });
    this.filterService.selectedSort$.subscribe((sort) => {
      this.sortOption = sort;
      this.applyFilters();
    });
    this.filterService.Search$.subscribe((searchValue) => {
      this.search = searchValue;
      this.applyFilters();
    });
  }

  notificationMessage: string | null = null;

  showNotification(message: string) {
    this.notificationMessage = message;
    setTimeout(() => {
      this.notificationMessage = null;
    }, 3000);
  }

  getAllWatches(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.isLoaded = false;
        this.products = {
          pages: data.pages,
          data: data?.data,
          currentPage: data.currentPage,
          totalCount: data.totalCount,
          perPage: data.perPage,
        };
        this.filteredProducts = this.products?.data;
        this.isLoaded = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilters(): void {
    if (this.products) {
      this.filteredProducts = this.products.data.filter((product: any) => {
        const categoryMatch =
          this.filteredCategories.length === 0 ||
          this.filteredCategories.includes(product.categoryId);

        const brandMatch =
          this.filteredBrands.length === 0 ||
          this.filteredBrands.includes(product.brandId);
        return categoryMatch && brandMatch;
      });
      this.filteredProducts = this.filteredProducts.sort((a: any, b: any) => {
        if (this.sortOption === 'Price low to high') {
          return a.price - b.price;
        } else if (this.sortOption === 'price high to low') {
          return Number(b.price) - Number(a.price);
        } else if (this.sortOption === 'a-z asc') {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        }
        return Number(a.price) - Number(b.price);
      });
      this.filteredProducts = this.filteredProducts.filter((prod) => {
        return prod.name.toLowerCase().includes(this.search);
      });
    }
    console.log(this.filteredProducts);
  }

  pagination(currentPage: number, event: Event, type: string) {
    event.preventDefault();
    if (type === 'next') {
      if (currentPage == this.products.pages) return;
      this.products.currentPage = currentPage + 1;
    } else if (type === 'previous') {
      if (currentPage === 1) return;
      this.products.currentPage = currentPage - 1;
    }

    this.productService.getAll(this.products.currentPage).subscribe({
      next: (data) => {
        this.isLoaded = false;
        this.products = {
          pages: data.pages,
          data: data?.data,
          currentPage: data.currentPage,
          totalCount: data.totalCount,
          perPage: data.perPage,
        };
        this.filteredProducts = this.products?.data;
        this.isLoaded = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

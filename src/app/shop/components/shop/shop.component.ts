import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ProductsApiService } from '../../business-logic/api/products-api.service';
import { IProduct } from '../../interfaces/iproduct';
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
  products: IProduct[] = [];
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
        this.products = data;
        this.filteredProducts = data;
        this.isLoaded = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const categoryMatch =
        this.filteredCategories.length === 0 ||
        this.filteredCategories.includes(product.IdCategory);
      const brandMatch =
        this.filteredBrands.length === 0 ||
        this.filteredBrands.includes(product.IdBrand);
      return categoryMatch && brandMatch;
    });
    this.filteredProducts = this.filteredProducts.sort((a, b) => {
      if (this.sortOption === 'most popular') {
        return b.Popularity - a.Popularity;
      } else if (this.sortOption === 'price high to low') {
        return b.Price.newPrice - a.Price.newPrice;
      } else if (this.sortOption === 'newest arrivals') {
        const dateA = new Date(a.Date);
        const dateB = new Date(b.Date);
        return dateB.getTime() - dateA.getTime();
      }
      return a.Price.newPrice - b.Price.newPrice;
    });

    this.filteredProducts = this.filteredProducts.filter((prod) => {
      return prod.Name.toLowerCase().includes(this.search);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { IProductPagination } from '../../../shop/interfaces/iproduct';
import { ProductsService } from '../../../services/products.service';
import { ProductsApiService } from '../../../shop/business-logic/api/products-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: IProductPagination;
  isVisible: boolean = false;
  constructor(private productService: ProductsApiService) {}
  DisplayAddNewItemForm() {
    this.isVisible = !this.isVisible;
  }
  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (response) => {
        console.log(response);
        this.products = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
    this.products.data = this.products.data.filter((x) => x.id !== id);
  }
  onProductAdded(isAdded: boolean) {
    if (isAdded) {
      setTimeout(() => {
        this.productService.getAll().subscribe({
          next: (response) => {
            console.log(response);
            this.products = response;
          },
          error: (error) => {
            console.error(error);
          },
        });
      }, 100);
    }
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
        this.products = {
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

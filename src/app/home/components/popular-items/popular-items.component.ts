import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ProductsApiService } from '../../../shop/business-logic/api/products-api.service';
import { IProduct } from '../../../shop/interfaces/iproduct';

@Component({
  selector: 'app-popular-items',
  templateUrl: './popular-items.component.html',
  styleUrl: './popular-items.component.css',
})
export class PopularItemsComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductsApiService) {}
  ngOnInit(): void {
    this.getAllWatches();
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
        this.products = data
          .sort((a, b) => {
            return b.Popularity - a.Popularity;
          })
          .slice(0, 6);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

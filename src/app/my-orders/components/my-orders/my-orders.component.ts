import { Component, OnInit } from '@angular/core';
import { OrderedProductsService } from '../../../services/ordered-products.service';
import { UserOrdersResponse } from '../../interfaces/imy-orders';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent implements OnInit {
  myOrders: UserOrdersResponse;

  constructor(private orderService: OrderedProductsService) {}
  ngOnInit(): void {
    this.orderService.userOrders().subscribe({
      next: (response) => {
        this.myOrders = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

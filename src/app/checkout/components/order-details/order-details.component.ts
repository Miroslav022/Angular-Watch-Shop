import { Component, OnInit } from '@angular/core';
import { IProductInCart } from '../../../cart/interfaces/i-product-in-cart';
import { CartService } from '../../../services/cart.service';
import { OrderedProductsService } from '../../../services/ordered-products.service';
import { IShippingAddress } from '../../interfaces/i-shipping-address';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit {
  orderedProducts: IProductInCart[] = [];
  shippingAddress: IShippingAddress;
  totalPrice: number = 0;
  constructor(private orderedProductsService: OrderedProductsService) {}
  ngOnInit(): void {
    this.orderedProductsService.orderedProducts.subscribe((x) => {
      this.orderedProducts = x;
      this.totalPriceCalculate();
    });
    this.orderedProductsService.shippingAddress.subscribe((x) => {
      this.shippingAddress = x;
    });
  }

  totalPriceCalculate(): void {
    this.totalPrice = this.orderedProducts.reduce((acc, cur) => {
      return (acc = acc + Number(0) * cur.quantity);
    }, 0);
  }
}

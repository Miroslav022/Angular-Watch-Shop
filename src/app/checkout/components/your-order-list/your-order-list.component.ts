import { Component, Input, OnInit } from '@angular/core';
import { IProductInCart } from '../../../cart/interfaces/i-product-in-cart';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-your-order-list',
  templateUrl: './your-order-list.component.html',
  styleUrl: './your-order-list.component.css',
})
export class YourOrderListComponent implements OnInit {
  cart: IProductInCart[] = [];
  totalPrice: number = 0;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.cart.subscribe((x) => {
      this.cart = x;
      this.totalPriceCalculate();
    });
  }

  totalPriceCalculate(): void {
    this.totalPrice = this.cart.reduce((acc, cur) => {
      return (acc = acc + cur.product.Price.newPrice * cur.qty);
    }, 0);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import {
  ICart,
  IProductInCart,
} from '../../../cart/interfaces/i-product-in-cart';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-your-order-list',
  templateUrl: './your-order-list.component.html',
  styleUrl: './your-order-list.component.css',
})
export class YourOrderListComponent implements OnInit {
  // @Input() cart: ICart;
  cart: ICart;
  totalPrice: number = 0;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (cartData) => {
        this.cart = {
          id: cartData.id,
          createdAt: cartData.createdAt,
          products: cartData.products,
        };
        this.totalPriceCalculate();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  totalPriceCalculate(): void {
    this.totalPrice = this.cart.products.reduce((acc, cur) => {
      return (acc = acc + cur.price * cur.quantity);
    }, 0);
  }
}

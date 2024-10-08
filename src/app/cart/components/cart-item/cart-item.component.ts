import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../shop/interfaces/iproduct';
import { IProductInCart } from '../../interfaces/i-product-in-cart';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent implements OnInit {
  @Input() product: IProductInCart;
  cart: IProductInCart[] = [];
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.cart.subscribe((x) => {
      this.cart = [];
    });
  }

  onDelete(productId: number): void {
    this.cart = this.cart.filter((x) => 0 !== productId);
    // this.cartService.setCart(this.cart);
  }

  changeQtyValueInc(productId: number) {
    let productIndex = this.cart.findIndex((prod) => 0 === productId);
    const produxtQty = this.cart[productIndex].quantity;
    this.cart[productIndex].quantity = produxtQty + 1;
    // this.cartService.setCart(this.cart);
  }
  changeQtyValueDec(productId: number) {
    let productIndex = this.cart.findIndex((prod) => 0 === productId);
    const produxtQty = this.cart[productIndex].quantity;
    if (produxtQty === 1) return;
    this.cart[productIndex].quantity = produxtQty - 1;
    // this.cartService.setCart(this.cart);
  }
}

import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { IProduct } from '../../../shop/interfaces/iproduct';
import { IProductInCart } from '../../interfaces/i-product-in-cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart: IProductInCart[];
  totalPrice: number = 0;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.cart.subscribe((cartItems) => {
      this.cart = cartItems;
      console.log(this.cart);
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart.reduce((acc, curr) => {
      return acc + curr.qty * curr.product.Price.newPrice;
    }, 0);
  }

  onDelete(productId: number): void {
    this.cart = this.cart.filter((x) => x.product.id !== productId);
    this.cartService.setCart(this.cart);
  }
  changeQtyValueInc(productId: number) {
    let productIndex = this.cart.findIndex(
      (prod) => prod.product.id === productId
    );
    const produxtQty = this.cart[productIndex].qty;
    this.cart[productIndex].qty = produxtQty + 1;
    this.cartService.setCart(this.cart);
  }
  changeQtyValueDec(productId: number) {
    let productIndex = this.cart.findIndex(
      (prod) => prod.product.id === productId
    );
    const produxtQty = this.cart[productIndex].qty;
    if (produxtQty === 1) return;
    this.cart[productIndex].qty = produxtQty - 1;
    this.cartService.setCart(this.cart);
  }
}

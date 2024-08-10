import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { IProduct } from '../../../shop/interfaces/iproduct';
import { ICart, IProductInCart } from '../../interfaces/i-product-in-cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart: ICart;
  totalPrice: number = 0;
  isLoading: boolean = false;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (cartData) => {
        this.isLoading = true;
        console.log(cartData);
        this.cart = {
          id: cartData.id,
          createdAt: cartData.createdAt,
          products: cartData.products,
        };
        this.calculateTotalPrice();
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  updateQuantity(product: any, operation: string) {
    if (operation === 'increase') {
      product.quantity = Number(product.quantity) + 1;
    } else if (operation === 'decrease') {
      product.quantity = Number(product.quantity) - 1;
    }
    let data = {
      cartItemId: product.id,
      quantity: product.quantity,
    };
    this.cartService.UpdateCart(data);
    this.calculateTotalPrice();
  }
  calculateTotalPrice(): void {
    this.totalPrice = this.cart.products.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);
  }

  onDelete(productId: number): void {
    this.cartService.removeItemFromCart(productId);
    let filteredProducts = this.cart.products.filter((x) => x.id !== productId);
    this.cart = { ...this.cart, products: filteredProducts };
    this.calculateTotalPrice();
  }
}

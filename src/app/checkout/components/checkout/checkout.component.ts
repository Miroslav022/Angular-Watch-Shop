import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { OrderedProductsService } from '../../../services/ordered-products.service';
import {
  ICart,
  IProductInCart,
} from '../../../cart/interfaces/i-product-in-cart';
import { IShippingAddress } from '../../interfaces/i-shipping-address';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  isFormValid: boolean = true;
  displayForm: boolean = false;
  cart: ICart;

  // cart: IProductInCart[] = [];
  constructor(
    private cartService: CartService,
    private orderedProductService: OrderedProductsService
  ) {}

  displayLocationForm() {
    this.displayForm = !this.displayForm;
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (cartData) => {
        this.cart = {
          id: cartData.id,
          createdAt: cartData.createdAt,
          products: cartData.products,
        };
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  order() {
    console.log(this.cart.id);
    this.orderedProductService.orderProduct(this.cart.id);
  }
}

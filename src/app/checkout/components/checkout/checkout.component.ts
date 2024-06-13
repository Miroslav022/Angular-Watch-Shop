import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { OrderedProductsService } from '../../../services/ordered-products.service';
import { IProductInCart } from '../../../cart/interfaces/i-product-in-cart';
import { IShippingAddress } from '../../interfaces/i-shipping-address';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  isFormValid: boolean = true;
  form: any = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    company: new FormControl(''),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('0', [
      Validators.required,
      Validators.pattern(/^[A-Za-z]*$/),
    ]),
    city: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    zip: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
    message: new FormControl(''),
  });
  cart: IProductInCart[] = [];
  constructor(
    private cartService: CartService,
    private orderedProductService: OrderedProductsService
  ) {}

  ngOnInit(): void {
    this.runValidation();
    this.cartService.cart.subscribe((x) => {
      this.cart = x;
    });
  }

  runValidation(): void {
    Object.keys(this.form.controls).forEach((ctrlName) => {
      this.form.get(ctrlName).markAsTouched();
    });
  }

  checkout(): void {
    // console.log(this.form.getRawValue());
    const shippingAddress: IShippingAddress = {
      street: this.form.get('address')?.value,
      city: this.form.get('city')?.value,
      country: this.form.get('country')?.value,
      zipCode: this.form.get('zip')?.value,
    };
    console.log(shippingAddress);
    this.orderedProductService.setOrderedProducts(this.cart, shippingAddress);
    this.cartService.removeAllFromCart();
  }

  fillForm(product: any): void {
    this.form.get('firstName').setValue(product.firstName);
    this.form.get('lastName').setValue(product.lastName);
    this.form.get('company').setValue(product.company);
    this.form.get('phoneNumber').setValue(product.phoneNumber);
    this.form.get('email').setValue(product.email);
    this.form.get('country').setValue(product.country);
    this.form.get('address').setValue(product.address);
    this.form.get('city').setValue(product.city);
    this.form.get('zip').setValue(product.zip);
    this.form.get('message').setValue(product.message);
  }
}

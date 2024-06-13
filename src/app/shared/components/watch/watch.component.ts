import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { IProductInCart } from '../../../cart/interfaces/i-product-in-cart';
import { IProduct } from '../../../shop/interfaces/iproduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css',
})
export class WatchComponent implements OnInit {
  @Input() Product: IProduct;
  @Output() atcMessage = new EventEmitter<void>();

  cart: IProductInCart[] = [];

  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.cartService.cart.subscribe((x) => {
      this.cart = x;
    });
  }

  addToCart(event: Event): void {
    event.preventDefault();
    this.atcMessage.emit();
    const alreadyExistInCart = this.cart.find(
      (x) => x.product.id === this.Product.id
    );
    if (alreadyExistInCart) {
      let id_product = this.cart.findIndex(
        (x) => x.product.id === this.Product.id
      );
      let productQty = this.cart[id_product].qty;
      productQty = Number(productQty) + 1;
      this.cart[id_product].qty = productQty;
    } else this.cart.push({ product: this.Product, qty: 1 });
  }

  navigateToProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }
}

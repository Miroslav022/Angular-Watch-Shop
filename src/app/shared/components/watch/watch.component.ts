import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { IProductInCart } from '../../../cart/interfaces/i-product-in-cart';
import { IProduct } from '../../../shop/interfaces/iproduct';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css',
})
export class WatchComponent implements OnInit {
  @Input() Product: IProduct;
  @Output() atcMessage = new EventEmitter<void>();
  isLoggedIn: boolean = false;
  cart: IProductInCart[] = [];
  image: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private _http: HttpClient,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.Product.images.length > 0) {
      this.image = this.Product.images[0].path;
      console.log(this.image);
    }
  }

  addToCart(event: Event): void {
    event.preventDefault();
    this.atcMessage.emit();
    this.cartService.setCart({ priceId: this.Product.priceId, quantity: 1 });
  }

  navigateToProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }
}

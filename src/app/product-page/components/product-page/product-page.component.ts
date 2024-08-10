import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IProduct } from '../../../shop/interfaces/iproduct';
import { ActivatedRoute } from '@angular/router';
import { ProductsApiService } from '../../../shop/business-logic/api/products-api.service';
import { CategoriesApiService } from '../../../shop/business-logic/api/categories-api.service';
import { BrandsApiService } from '../../../shop/business-logic/api/brands-api.service';
import { CartService } from '../../../services/cart.service';
import { IProductInCart } from '../../../cart/interfaces/i-product-in-cart';
import { RecensionsService } from '../../business-logic/Api/recensions.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent implements OnInit {
  product: IProduct | null = null;
  category: string = '';
  brand: string = '';
  cart: IProductInCart[] = [];
  username: string = '';
  isLoggedIn: boolean = false;
  image: string = '';
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private productsApiService: ProductsApiService,
    private _recensionService: RecensionsService,
    private cartService: CartService
  ) {}

  notificationMessage: string | null = null;

  showNotification() {
    this.notificationMessage = 'Product added to cart!';
    setTimeout(() => {
      this.notificationMessage = null;
    }, 3000);
  }

  loadProduct() {
    const productId = Number(this.route.snapshot.paramMap.get('id') || 0);
    this.productsApiService.getProductById(productId).subscribe(
      (product: any) => {
        this.product = product;
        if (this.product && this.product.images.length > 0) {
          this.image = this.product.images[0].path;
        }
      },
      (error) => console.error('Error fetching product details:', error)
    );
  }

  ngOnInit(): void {
    const tokenData = this.authService.getJwtTokenData();
    this.username = tokenData?.Username;
    this.loadProduct();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  addToCart(event: Event): void {
    event.preventDefault();
    this.showNotification();
    if (this.product) {
      this.cartService.setCart({ priceId: this.product?.priceId, quantity: 1 });
    }
  }
}

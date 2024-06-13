import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IProduct } from '../../../shop/interfaces/iproduct';
import { ActivatedRoute } from '@angular/router';
import { ProductsApiService } from '../../../shop/business-logic/api/products-api.service';
import { CategoriesApiService } from '../../../shop/business-logic/api/categories-api.service';
import { BrandsApiService } from '../../../shop/business-logic/api/brands-api.service';
import { CartService } from '../../../services/cart.service';
import { IProductInCart } from '../../../cart/interfaces/i-product-in-cart';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent implements OnInit {
  product: IProduct | undefined;
  category: string = '';
  brand: string = '';
  cart: IProductInCart[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsApiService: ProductsApiService,
    private categoryApiService: CategoriesApiService,
    private brandApiService: BrandsApiService,
    private cartService: CartService
  ) {}

  notificationMessage: string | null = null;

  showNotification() {
    this.notificationMessage = 'Product added to cart!';
    setTimeout(() => {
      this.notificationMessage = null;
    }, 3000);
  }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id') || 0);
    this.productsApiService.getProductById(productId).subscribe(
      (product) => {
        this.product = product;
        // Fetch category only when product data is available
        if (product) {
          this.categoryApiService.getCategoryById(product.IdCategory).subscribe(
            (category) => {
              if (category) {
                this.category = category.category; // Assuming category has a 'name' property
              } else {
                console.error(
                  `Category not found for product with ID ${productId}`
                );
              }
            },
            (error) => console.error('Error fetching category details:', error)
          );
          this.brandApiService.getBrandById(product.IdBrand).subscribe(
            (brand) => {
              if (brand) {
                this.brand = brand.brand; // Assuming category has a 'name' property
              } else {
                console.error(
                  `Category not found for product with ID ${productId}`
                );
              }
            },
            (error) => console.error('Error fetching category details:', error)
          );
        }
      },
      (error) => console.error('Error fetching product details:', error)
    );
    this.cartService.cart.subscribe((x) => {
      this.cart = x;
    });
  }

  addToCart(event: Event): void {
    event.preventDefault();
    this.showNotification();
    if (this.product) {
      const alreadyExistInCart = this.cart.find(
        (x) => x.product.id === this.product?.id
      );
      if (alreadyExistInCart) {
        let id_product = this.cart.findIndex(
          (x) => x.product.id === this.product?.id
        );
        let productQty = this.cart[id_product].qty;
        productQty = Number(productQty) + 1;
        this.cart[id_product].qty = productQty;
      } else this.cart.push({ product: this.product, qty: 1 });
    }
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}
  products: any = [
    {
      name: 'Product 1',
      price: 19.99,
      image: 'https://example.com/images/product1.jpg',
    },
    {
      name: 'Product 2',
      price: 29.99,
      image: 'https://example.com/images/product2.jpg',
    },
    {
      name: 'Product 3',
      price: 39.99,
      image: 'https://example.com/images/product3.jpg',
    },
    {
      name: 'Product 4',
      price: 49.99,
      image: 'https://example.com/images/product4.jpg',
    },
    {
      name: 'Product 5',
      price: 59.99,
      image: 'https://example.com/images/product5.jpg',
    },
    {
      name: 'Product 6',
      price: 69.99,
      image: 'https://example.com/images/product6.jpg',
    },
    {
      name: 'Product 7',
      price: 79.99,
      image: 'https://example.com/images/product7.jpg',
    },
    {
      name: 'Product 8',
      price: 89.99,
      image: 'https://example.com/images/product8.jpg',
    },
    {
      name: 'Product 9',
      price: 99.99,
      image: 'https://example.com/images/product9.jpg',
    },
  ];
}

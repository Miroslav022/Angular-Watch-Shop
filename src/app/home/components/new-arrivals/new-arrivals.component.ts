import { Component } from '@angular/core';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.css',
})
export class NewArrivalsComponent {
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
  ];
}

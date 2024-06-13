import { Component } from '@angular/core';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.css',
})
export class NewArrivalsComponent {
  products: any = [
    {
      name: "Seiko Prospex Diver's Watch",
      price: 1999.99,
      image: 'assets/img/gallery/new_product1.png',
    },
    {
      name: 'Citizen Eco-Drive Titanium',
      price: 2999.99,
      image: 'assets/img/gallery/new_product2.png',
    },
    {
      name: 'Breitling Navitimer 8',
      price: 3999.99,
      image: 'assets/img/gallery/new_product3.png',
    },
  ];
}

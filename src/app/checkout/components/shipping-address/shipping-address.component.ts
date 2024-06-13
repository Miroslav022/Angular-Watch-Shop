import { Component, OnInit } from '@angular/core';
import { IShippingAddress } from '../../interfaces/i-shipping-address';
import { OrderedProductsService } from '../../../services/ordered-products.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.css',
})
export class ShippingAddressComponent implements OnInit {
  shippingAddress: IShippingAddress;
  constructor(private orderedProductsService: OrderedProductsService) {}
  ngOnInit(): void {
    this.orderedProductsService.shippingAddress.subscribe((x) => {
      this.shippingAddress = x;
      console.log(this.shippingAddress);
      console.log(x);
    });
  }
}

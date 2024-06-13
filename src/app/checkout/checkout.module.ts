import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SharedModule } from '../shared/shared.module';
import { YourOrderListComponent } from './components/your-order-list/your-order-list.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    YourOrderListComponent,
    ConfirmationComponent,
    OrderDetailsComponent,
    ShippingAddressComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CheckoutModule {}

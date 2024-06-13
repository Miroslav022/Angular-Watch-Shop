import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { CartItemComponent } from './components/cart-item/cart-item.component';
@NgModule({
  declarations: [CartComponent, CartItemComponent],
  imports: [CommonModule, SharedModule],
})
export class CartModule {}

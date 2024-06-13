import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductPageComponent],
  imports: [CommonModule, SharedModule],
})
export class ProductPageModule {}

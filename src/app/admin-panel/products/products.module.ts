import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { NewProductFormComponent } from './new-product-form/new-product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditProductSpecificationsComponent } from './edit-product-specifications/edit-product-specifications.component';
import { ProductSpecificationComponent } from './product-specification/product-specification.component';

@NgModule({
  declarations: [ProductsComponent, NewProductFormComponent, EditProductComponent, EditProductSpecificationsComponent, ProductSpecificationComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ProductsModule {}

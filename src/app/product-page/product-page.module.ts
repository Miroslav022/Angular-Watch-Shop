import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { SharedModule } from '../shared/shared.module';
import { RecensionFormComponent } from './components/recension-form/recension-form.component';
import { RecensionsComponent } from './components/recensions/recensions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductPageComponent,
    RecensionFormComponent,
    RecensionsComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProductPageModule {}

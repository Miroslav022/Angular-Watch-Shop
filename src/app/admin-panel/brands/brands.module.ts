import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandComponent } from './brand/brand.component';
import { NewBrandFormComponent } from './new-brand-form/new-brand-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { EditBrandComponent } from './edit-brand/edit-brand.component';

@NgModule({
  declarations: [BrandComponent, NewBrandFormComponent, EditBrandComponent],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class BrandsModule {}

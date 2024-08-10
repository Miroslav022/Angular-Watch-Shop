import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { NewCategoryFormComponent } from './new-category-form/new-category-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@NgModule({
  declarations: [CategoriesComponent, NewCategoryFormComponent, EditCategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CategoriesModule {}

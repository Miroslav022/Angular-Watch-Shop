import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'edit/:id', component: EditCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}

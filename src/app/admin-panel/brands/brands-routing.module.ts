import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './brand/brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';

const routes: Routes = [
  {
    path: '',
    component: BrandComponent,
  },
  {
    path: 'edit/:id',
    component: EditBrandComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandsRoutingModule {}

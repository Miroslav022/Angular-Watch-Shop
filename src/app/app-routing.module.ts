import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { AboutUsComponent } from './about-us/components/about-us/about-us.component';
import { ContactComponent } from './contact/components/contact/contact.component';
import { CartComponent } from './cart/components/cart/cart.component';
import { authGuard } from './auth/auth.guard';
import { ProductPageComponent } from './product-page/components/product-page/product-page.component';
import { MyOrdersComponent } from './my-orders/components/my-orders/my-orders.component';
import { adminpanelGuard } from './adminpanel.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('./shop/shop.module').then((m) => m.ShopModule),
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./checkout/checkout.module').then((m) => m.CheckoutModule),
        canActivate: [authGuard],
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'myOrders',
        component: MyOrdersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'about',
        component: AboutUsComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'product/:id',
        component: ProductPageComponent,
      },
      {
        path: 'adminpanel',
        loadChildren: () =>
          import('./admin-panel/admin-panel.module').then(
            (m) => m.AdminPanelModule
          ),
        canActivate: [adminpanelGuard],
      },
      {
        path: '**',
        loadChildren: () =>
          import('./not-found/not-found.module').then((m) => m.NotFoundModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

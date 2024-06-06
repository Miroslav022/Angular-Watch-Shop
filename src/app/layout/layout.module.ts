import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/layout/components/footer/footer.component';
import { HeaderComponent } from './components/layout/components/header/header.component';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/layout/components/navigation/navigation.component';



@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule { }

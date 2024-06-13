import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/layout/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/layout/components/navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LayoutComponent, FooterComponent, NavigationComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class LayoutModule {}

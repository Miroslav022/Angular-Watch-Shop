import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SharedModule } from '../shared/shared.module';
import { PassusComponent } from './components/passus/passus.component';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [AboutUsComponent, PassusComponent],
  imports: [CommonModule, SharedModule, HomeModule],
})
export class AboutUsModule {}

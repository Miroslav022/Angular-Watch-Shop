import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
// import { AppComponent } from '../app.component';
import { HeroComponent } from './components/hero/hero.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { GalleryAreaComponent } from './components/gallery-area/gallery-area.component';
import { PopularItemsComponent } from './components/popular-items/popular-items.component';
import { CtaComponent } from './components/cta/cta.component';
import { WatchOfChoiceComponent } from './components/watch-of-choice/watch-of-choice.component';
import { ShopMethodComponent } from './components/shop-method/shop-method.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeroComponent,
    NewArrivalsComponent,
    GalleryAreaComponent,
    PopularItemsComponent,
    CtaComponent,
    WatchOfChoiceComponent,
    ShopMethodComponent,
    HomeComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  exports: [CtaComponent, ShopMethodComponent],
})
export class HomeModule {}

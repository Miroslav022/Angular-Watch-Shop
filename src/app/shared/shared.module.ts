import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { WatchComponent } from './components/watch/watch.component';
import { ButtonComponent } from './components/button/button.component';
import { RouterModule } from '@angular/router';
import { SinglearrivalsComponent } from './components/singlearrivals/singlearrivals.component';
import { SingleWatchOfChoiceComponent } from './components/single-watch-of-choice/single-watch-of-choice.component';
import { SingleShopMethodComponent } from './components/single-shop-method/single-shop-method.component';
import { SelectComponent } from './components/select/select.component';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { FilterNavigationComponent } from './components/filter-navigation/filter-navigation.component';

@NgModule({
  declarations: [
    BannerComponent,
    WatchComponent,
    ButtonComponent,
    SinglearrivalsComponent,
    SingleWatchOfChoiceComponent,
    SingleShopMethodComponent,
    SelectComponent,
    FilterButtonComponent,
    FilterNavigationComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    BannerComponent,
    WatchComponent,
    ButtonComponent,
    SinglearrivalsComponent,
    SingleWatchOfChoiceComponent,
    SingleShopMethodComponent,
    SelectComponent,
    FilterButtonComponent,
    FilterNavigationComponent,
  ],
})
export class SharedModule {}

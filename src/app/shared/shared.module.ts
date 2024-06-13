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
import { FormComponent } from './components/form/form.component';
import { InputComponent } from './components/input/input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { ContactInfoBlockComponent } from './components/contact-info-block/contact-info-block.component';
import { BrandFilterComponent } from './components/brand-filter/brand-filter.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { SearchComponent } from './components/search/search.component';
import { NotificationComponentComponent } from './components/notification-component/notification-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    FormComponent,
    InputComponent,
    TextareaComponent,
    SubmitButtonComponent,
    ContactInfoBlockComponent,
    BrandFilterComponent,
    CheckboxComponent,
    CategoryFilterComponent,
    SearchComponent,
    NotificationComponentComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
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
    FormComponent,
    InputComponent,
    TextareaComponent,
    SubmitButtonComponent,
    ContactInfoBlockComponent,
    NotificationComponentComponent,
  ],
})
export class SharedModule {}

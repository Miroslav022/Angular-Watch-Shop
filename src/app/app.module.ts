import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AboutUsModule } from './about-us/about-us.module';
import { ContactComponent } from './contact/components/contact/contact.component';
import { ContactModule } from './contact/contact.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AboutUsModule,
    ContactModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

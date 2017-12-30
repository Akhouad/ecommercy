import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';

import { PublicRoutingModule } from './public/public-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';

import { UrlService } from './url.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PublicModule,
    PublicRoutingModule,
    AdminModule,
    AdminRoutingModule
  ],
  providers: [UrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }

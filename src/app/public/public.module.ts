import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PublicRoutingModule } from './public-routing.module';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductComponent } from './pages/product/product.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroComponent } from './components/hero/hero.component';
import { OtherProductsComponent } from './components/other-products/other-products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { MarquesComponent } from './pages/marques/marques.component';
import { AboutComponent } from './pages/about/about.component';
import { SearchComponent } from './pages/search/search.component';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    ProductComponent,
    ProductDetailsComponent,
    HomeComponent,
    HeroComponent,
    OtherProductsComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    ContactComponent,
    CategoriesComponent,
    MarquesComponent,
    AboutComponent,
    SearchComponent
  ]
})
export class PublicModule { }

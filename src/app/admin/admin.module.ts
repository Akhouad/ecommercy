import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';

import { FormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { UrlService } from '../url.service';

import { HttpModule } from '@angular/http';
import { LoginGuard } from './login.guard';
import { UsersComponent } from './pages/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { MarquesComponent } from './pages/marques/marques.component';
import { AddMarqueComponent } from './pages/add-marque/add-marque.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { MessagesComponent } from './pages/messages/messages.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    SidebarComponent,
    HeaderComponent, 
    FooterComponent, 
    ContentComponent, 
    AdminComponent, LoginComponent, UsersComponent, HomeComponent, ProductsComponent, AddProductComponent, CategoriesComponent, AddCategoryComponent, MarquesComponent, AddMarqueComponent, CommandesComponent, MessagesComponent
  ],
  providers: [AuthService, UrlService, LoginGuard]
})
export class AdminModule { }

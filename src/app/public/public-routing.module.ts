import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HeroComponent } from './components/hero/hero.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { MarquesComponent } from './pages/marques/marques.component';
import { AboutComponent } from './pages/about/about.component';
import { SearchComponent } from './pages/search/search.component';

const publicRoutes: Routes = [
  { path: '', component: HomeComponent, children:[
      {path: '', component: ProductsComponent, data: {title: 'Ecommercy - La boutique n:1'}},
      {path: 'login', component: LoginComponent, data: {title: 'Se connecter - Ecommercy'}},
      {path: 'register', component: RegisterComponent, data: {title: 'S\'inscrire - Ecommercy'}},
      {path: 'cart', component: CartComponent, data: {title: 'Panier - Ecommercy'}},
      {path: 'contact', component: ContactComponent, data: {title: 'Contactez-nous - Ecommercy'}},
      {path: 'about', component: AboutComponent, data: {title: 'A propos de nous - Ecommercy'}},
      {path: 'category/:id', component: CategoriesComponent, data: {title: 'Categorie'}},
      {path: 'marque/:id', component: MarquesComponent, data: {title: 'Marque'}},
      {path: 'search/:keyword', component: SearchComponent, data: {title: 'Resultats de la recherche'}},
      { path: 'product/:title/:id', component: ProductComponent, children: [
          { path: '', component: ProductDetailsComponent, data: {title: "Ecommercy"}}
        ] 
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(publicRoutes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

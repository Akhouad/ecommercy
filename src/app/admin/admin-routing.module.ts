import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
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

import { LoginGuard } from "./login.guard";

const adminRoutes: Routes = [
  { path: 'admin', component: AdminComponent, data: {title: "Administration"}, children: [
      {path: '', component: HomeComponent, canActivate: [LoginGuard]},
      {path: 'users', component: UsersComponent, data: [{PageName: 'users'}]},
      {path: 'products', children: [
      		{path: '', component: ProductsComponent},
      		{path: 'add', component: AddProductComponent}
      	]
  	  },
      {path: 'categories', children: [
          {path: '', component: CategoriesComponent},
          {path: 'add', component: AddCategoryComponent}
        ]
      },
      {path: 'marques', children: [
          {path: '', component: MarquesComponent},
          {path: 'add', component: AddMarqueComponent}
        ]
      },
      {path: 'commandes', component: CommandesComponent},
      {path: 'messages', component: MessagesComponent},
    ] 
  },
  {path: 'admin/login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

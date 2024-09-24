import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    title:"Products"
  },
  {
    path: 'register',
    component: RegisterComponent,
    title:"Register"
  },
  {
    path: 'login',
    component: LoginComponent,
    title:"Login"
  },
  {
    path: 'cart',
    component: CartComponent,
    title:"Cart"
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    title:"Product Details"
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    title:"404 Not Found"
  },
];

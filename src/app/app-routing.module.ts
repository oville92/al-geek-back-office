import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { RegisterComponent } from './register/register.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'order-detail/:id', component: OrderDetailComponent},
  {path: 'product-list', component: ProductListComponent},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'customer-list', component: CustomerListComponent},
  {path: 'customer-detail/:id', component: CustomerDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

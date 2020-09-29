import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomerApiService } from './api/customer-api.service';
import { OrderApiService } from './api/order-api.service';
import { ProductApiService } from './api/product-api.service';
import { StockApiService } from './api/stock-api.service';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { RegisterComponent } from './register/register.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    CustomerListComponent,
    OrdersComponent,
    ProductDetailComponent,
    ProductListComponent,
    CustomerDetailComponent,
    RegisterComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    CommonModule
  ],
  providers: [CustomerApiService, OrderApiService, ProductApiService, StockApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerApiService } from '../../api/customer-api.service';
import { OrderApiService } from '../../api/order-api.service';
import { ICustomer } from '../customer-list/customer';
import { IOrder } from '../../orders/order';
import { IInfosBank } from '../../orders/infosBank';
import { ILigneCommande } from '../../orders/ligneCommande';
import { CommonModule } from '@angular/common';

@Component({
  //selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer: ICustomer;
  errorMessage: string;
  orders: IOrder[];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private customerApiService: CustomerApiService,
    private orderApiService: OrderApiService) { }

  ngOnInit(): void {

    let id = +this.route.snapshot.paramMap.get("id");

    this.customerApiService.getCustomerById(id).subscribe({
      next: customer => {
        this.customer = customer;
      },
      error: err => {
        this.errorMessage = err
      }
    });


    this.orderApiService.getOrderByClient(id).subscribe({
      next: data => {
        this.orders = data;
        console.log(this.orders);
      },
      error: err => {
        console.log("======== INSIDE ngOnInit getcustomerbyid from orders component===========");
        console.log(err);
      }
    });

  }

  onBack(): void {
    this.router.navigate(['/customer-list']);
  }







}

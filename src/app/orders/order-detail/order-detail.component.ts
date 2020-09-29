import { Component, OnInit } from '@angular/core';
import { OrderApiService } from '../../api/order-api.service';
import { ICustomer } from '../../customers/customer-list/customer';
import { IOrder } from '../../orders/order';
import { IInfosBank } from '../../orders/infosBank';
import { ILigneCommande } from '../../orders/ligneCommande';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerApiService } from 'src/app/api/customer-api.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private orderApiService: OrderApiService,
    private route: ActivatedRoute,
    private router: Router,
    private customerApiService: CustomerApiService) { }


  orders: IOrder[];
  errorMessage: string;
  ligneCommande: ILigneCommande[];
  customer: ICustomer;
  order: IOrder;


  onBack(): void {
    this.router.navigate(['/orders']);
  }

  ngOnInit(): void {

    let id = +this.route.snapshot.paramMap.get("id");

    this.orderApiService.getOderById(id).subscribe({
      next: data => {
        this.order = data;
        console.log(this.order);

        this.customerApiService.getCustomerById(this.order.clientId).subscribe({
          next: customer => {
            this.customer = customer;

            this.orderApiService.getOrderByClient(this.order.clientId).subscribe({
              next: data => {
                this.orders = data;
                console.log(this.orders);
              },
              error: err => {
                console.log("======== INSIDE ngOnInit getcustomerbyid from orders component===========");
                console.log(err);
              }
            });
          },

          error: err => {
            this.errorMessage = err
          }
        });
      },
      error: err => {
        console.log("======== INSIDE ngOnInit getOrderById from order-detail component ===========");
        console.log(err);
      }

    });






  }

}

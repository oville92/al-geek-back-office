import { Component, OnInit } from '@angular/core';
import { IOrder } from './order';
import { IInfosBank } from './infosBank';
import { ILigneCommande } from './ligneCommande';
import { OrderApiService } from '../../app/api/order-api.service';
import { Router } from '@angular/router';



@Component({
  //selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: IOrder[];
  errorMessage: string;
  isDataAvailable: boolean = false;

  constructor(private orderApiService: OrderApiService,
    private router: Router) { }


  goToDetails(orderId: number) {
    this.router.navigateByUrl('/order-detail/' + orderId);
  }

  ngOnInit(): void {

    this.orderApiService.getOrders().subscribe({
      next: orders => {
        console.log('========= je passe par ngOnInit from getOrder component.ts ===========');
        this.orders = orders;
        console.log(this.orders);
        this.isDataAvailable = true;
      },
      error: err => {
        console.log('========= erreur de retour ngOnInit from order component.ts ===========');
        this.errorMessage = err
      }
    }
    );
  }




  
}



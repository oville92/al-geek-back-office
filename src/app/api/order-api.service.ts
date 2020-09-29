import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrder } from '../orders/order';
import { ICustomer } from '../customers/customer-list/customer';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


// URL for api
const ORDER_API_URL = environment.orderApiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(private http: HttpClient) { }
  
  getOrders() : Observable<IOrder[]> {
    console.log('=====IN getOrders from order api service ====');
    const headers = new HttpHeaders().set("Content-Type", "application/json");
  
    return this.http.get<IOrder[]>(ORDER_API_URL + '/all', { headers }) 
    .pipe(catchError(this.handleError));
  }

  getOderById(id): Observable<IOrder> {
    console.log('=====IN getOrderById from order api service ====');
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.get<IOrder>(ORDER_API_URL + "/id/" + id, {headers})
    .pipe(catchError(this.handleError));
  }

  // ordersByClient() : '.../manager/order/customer/id={id} pour orderManager
  // api gateway : '.../manager/order/customer/{id} 

  getOrderByClient(id) : Observable<IOrder[]> {
    console.log('=====IN getOrderByClient from order api service ====');
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.get<IOrder[]>(ORDER_API_URL + "/customer/" + id, {headers})
    .pipe(catchError(this.handleError));
  }


  private handleError(err: HttpErrorResponse){
    let errorMessage = '';

    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code : ${err.status}, error message is : ${err.message}`;
    }
    return throwError(errorMessage);
  }

}

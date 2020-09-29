import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Stock } from '../models/stock.model';


// URL for API
const STOCK_API_URL = environment.stockApiUrl;

@Injectable({
  providedIn: 'root'
})
export class StockApiService {

  constructor(private http: HttpClient) { }


  getStockById(productId: number): Observable<Stock>{
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get<Stock>(STOCK_API_URL + "/id/" + productId, {headers});
  }

  getStocks() : Observable<Stock[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get<Stock[]>(STOCK_API_URL + "/all", {headers}).pipe(catchError(this.handleError));
  }

  updateStock(stock: Stock) : Observable<Stock> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log("dans le service update stock");
    console.log(stock);
    return this.http.put<Stock>(STOCK_API_URL + "/update", stock, {headers});
  }




  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';


// URL for api
const PRODUCT_API_URL = environment.productApiUrl;


@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http: HttpClient) { }

  // TO DO :
  // implémenter en-dessous les méthodes dont tu as besoin (celles qui vont attaquer les services exposés par Product-manager,
  // puis par le gateway/customer quand on aura fini l'intégration)

  getProducts(): Observable<Product[]>{
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get<Product[]>(PRODUCT_API_URL + "/all", {headers}).pipe(catchError(this.handleError));
  }

  getProductById(id: number): Observable<Product>{
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get<Product>(PRODUCT_API_URL + "/id/" + id, {headers}).pipe(catchError(this.handleError)); 
  }

  addProduct(product: Product) : Observable<Product> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return null;
  }

  updateProduct(product: Product) : Observable<Product> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Product>(PRODUCT_API_URL + "/update", product, { headers }).pipe(catchError(this.handleError));
  }




  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}

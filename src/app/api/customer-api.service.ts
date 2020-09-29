import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICustomer } from '../customers/customer-list/customer';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthorizationService } from './authorization.service';
import { switchMap, pluck, map } from 'rxjs/operators';

// URL for api
const CUSTOMER_API_URL = environment.customerApiUrl;

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor(private http: HttpClient,
    private auth: AuthorizationService) { }


  getCustomers(): Observable<ICustomer[]> {
    console.log('======== IN getCustomers de customer api service =====');
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    // return this.http.get<ICustomer[]>(CUSTOMER_API_URL + '/all', { headers })
    // .pipe(catchError(this.handleError));
    ////
    return new Observable((obs) =>
      this.auth.getAuthenticatedUser().getSession((err, session) => {
        if (err) {
          console.log('======== IN getCustomers de customer api service LOG ERR GET SESSION =====' + err);
          obs.error('Authentication error.');
        }
        obs.next(session); obs.complete();

      }))
      //partie de code à dupliquer dans les autres méthodes. CA MARCHE
      //attention au relancement des ECS sur Gateway car ils redémarrent sans prévenir.
      .pipe(
        // 2. Prepare header with content-type and Authorization
        map((session: any) => new HttpHeaders()
          .set('Content-Type', 'application/json')
          // 'Authorization' is set to the JWT token for the current session.
          .set('Authorization', session.getIdToken().getJwtToken())),

        // 3. GET request
        switchMap((headers: HttpHeaders) =>
          this.http.get<ICustomer[]>('https://h1y8l5co8c.execute-api.eu-west-3.amazonaws.com/portal/gateway/customer/all',
            { headers }))

        // 4. From the response, take the 'books' field
          
        , catchError(this.handleError)
      );
  }

  getCustomerById(id: number): Observable<ICustomer> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    //+ ajouter token-id et la value de session id que renverra Cognito

    return this.http.get<ICustomer>(CUSTOMER_API_URL + "/id/" + id, { headers }).pipe(catchError(this.handleError));
  }

  // ordersByClient() : '.../manager/order/customer/id={id} pour orderManager
  // api gateway : '.../manager/order/customer/{id} 


  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code : ${err.status}, error message is : ${err.message}`;
    }
    return throwError(errorMessage);
  }



}

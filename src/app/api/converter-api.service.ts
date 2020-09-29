import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

// URL for api
const CONVERTER_API_URL = environment.converterApiUrl;

@Injectable({
    providedIn: 'root'
  })
  export class ConverterApiService {

    constructor(private http: HttpClient) { }

    convertFromEuro(targetCurrency: string, amount: number) : Observable<number> {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.get<number>(CONVERTER_API_URL + "/convert/from/EUR/to/" + targetCurrency + "/amount/" + amount,
                                        {headers}).pipe(catchError(this.handleError));
    }

    private handleError(error: Response | any) {
        return Observable.throw(error);
      }
  }
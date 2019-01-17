import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    public utility : UtilityService,
    private route: Router
  ) { }

  getHeaders() : HttpHeaders{
    const authorizationToken = this.utility.getToken();
    const headers =  new HttpHeaders({
      'Content-Type':  'application/json',
      'authorization': authorizationToken || ''
    })
    return headers;
  };
  
  get(url:string): Observable<HttpResponse<any>> {
    let options : HttpHeaders = this.getHeaders();
    return this.http.get<any>(environment.baseUrl+url, { observe: 'response', headers: options }).pipe(
      catchError( (error) => this.handleError(error))
    );
  }

  post(url:string, data: any): Observable<HttpResponse<any>> {
    let options : HttpHeaders = this.getHeaders();
    return this.http.post<any>(environment.baseUrl+url, data, { observe: 'response', headers: options }).pipe(
      catchError( (error) => this.handleError(error))
    );
  }

  put(url:string, data: any): Observable<HttpResponse<any>> {
    let options : HttpHeaders = this.getHeaders();
    return this.http.put<any>(environment.baseUrl+url, data, { observe: 'response', headers: options }).pipe(
      catchError( (error) => this.handleError(error))
    );
  }

  delete(url:string): Observable<HttpResponse<any>> {
    let options : HttpHeaders = this.getHeaders();
    return this.http.delete<any>(environment.baseUrl+url, { observe: 'response', headers: options }).pipe(
      catchError( (error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    // if(error.status == 401){
    //   this.utility.removeToken();
    //   this.route.navigate(['/login']);
    // }
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError({
      status : error.status,
      message : error.error.message
    });

  };
}

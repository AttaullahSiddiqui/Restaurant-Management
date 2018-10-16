import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

 
  
  get(url:string): Observable<HttpResponse<any>> {
    return this.http.get<any>(environment.baseUrl+url, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }

  post(url:string, data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.baseUrl+url, data, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }

  put(url:string, data: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(environment.baseUrl+url, data, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }

  delete(url:string, data: any): Observable<HttpResponse<any>> {
    return this.http.delete<any>(environment.baseUrl+url, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
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
    return throwError(
      'Something bad happened; please try again later.');
  };
}

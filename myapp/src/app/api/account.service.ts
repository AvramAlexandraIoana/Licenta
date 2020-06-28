import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  url: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.url = environment.url + '/account';

   }

   saveAccount(account: any, userId: number) {
    return this.http.post<Account>(this.url + '/new/' + userId, JSON.stringify(account), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );

  }

  getAccountList(userId: number): Observable<Account[]> {
    return this.http.get<Account[]>(this.url + '/getAllCards/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  deleteAccount(accountId: number): Observable<Account> {
    return this.http.delete<Account>(this.url + '/delete/' + accountId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );

  }

  
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

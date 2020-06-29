import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Transaction } from '../_models/Transaction';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  url: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.url = environment.url + '/transaction';

   }

   saveTransaction(transaction: any) {
    return this.http.post<Transaction>(this.url + '/new', JSON.stringify(transaction), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );

  }

  getTransactions(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url + '/index/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updateTrasaction(transactionId: number, transaction): Observable<Transaction> {
    return this.http.put<Transaction>(this.url + '/edit/' + transactionId, JSON.stringify(transaction), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getMoneySpend(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url + '/getSpendMoney/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  getTransactionNotificationNumber(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url + '/getNumberOfNotification/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  
  getTransactionNotificationForToday(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url + '/getNotificationsForToday/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getTransactionNotificationForYestarday(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url + '/getNotificationsForYestarday/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getTransactionNotificationForThisWeek(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url + '/getNotificationsForThisWeek/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getTransactionsForToday(transactionId: number, unit: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url + '/getTransactionsForToday/' + transactionId + '/' + unit, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getTransactionsForWeek(transactionId: number, unit: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url + '/getTransactionsForWeek/' + transactionId + '/' + unit, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }


  getTransactionsForMonth(transactionId: number, unit: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url + '/getTransactionsForMonth/' + transactionId + '/' + unit, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getTransactionsForYear(transactionId: number, unit: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url + '/getTransactionsForYear/' + transactionId + '/' + unit, this.httpOptions)
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

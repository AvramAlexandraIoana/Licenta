import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryTransaction } from '../_models/CategoryTransaction';

@Injectable({
  providedIn: 'root'
})
export class CategoryTransactionsService {

  url: string;
  token: any;
  httpOptions: { headers: HttpHeaders; };
  constructor(private http: HttpClient) {
    this.url = environment.url + '/categoryTransaction';
    this.token = localStorage.getItem('token');
    this.httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':  `Bearer ${this.token}`
      })
    };

   }

   saveCategoryTransaction(transaction: any) {
    return this.http.post<CategoryTransaction>(this.url + '/new', JSON.stringify(transaction), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );

  }

  getSumPerCategory(userId: number, unit: string, month: number) {
    return this.http.get<number>(this.url + '/getExpenses/' + userId + '/' + unit + '/' + month, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getCategoryTransactionNotificationForToday(userId: number): Observable<CategoryTransaction[]> {
    return this.http.get<CategoryTransaction[]>(this.url + '/getCategoryNotificationsForToday/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getCategoryTransactionNotificationForYestarday(userId: number): Observable<CategoryTransaction[]> {
    return this.http.get<CategoryTransaction[]>(this.url + '/getCategoryNotificationsForYestarday/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getCategoryTransactionNotificationForThisWeek(userId: number): Observable<CategoryTransaction[]> {
    return this.http.get<CategoryTransaction[]>(this.url + '/getCategoryNotificationsForThisWeek/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getCategoryTransactions(userId: number): Observable<CategoryTransaction[]> {
    return this.http.get<CategoryTransaction[]>(this.url + '/index/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getCategoryTransactionList(): Observable<CategoryTransaction[]> {
    return this.http.get<CategoryTransaction[]>(this.url + '/index', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getCategoryTransaction(categoryTransactionId: number): Observable<CategoryTransaction> {
    return this.http.get<CategoryTransaction>(this.url  + '/' + categoryTransactionId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updateCategoryTransaction(categoryTransactionId: number, user): Observable<CategoryTransaction> {
    return this.http.put<CategoryTransaction>(this.url + '/edit/' + categoryTransactionId, JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  deteleCategoryTransaction(categoryTransactionId: number): Observable<CategoryTransaction> {
    return this.http.delete<CategoryTransaction>(this.url + '/delete/' + categoryTransactionId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getCategoryTransactionsForToday(categoryTransactionId: number, unit: string): Observable<CategoryTransaction[]> {
    return this.http.get<CategoryTransaction[]>(this.url + '/getCategoryTransactionsForToday/' + categoryTransactionId + '/' + unit, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getCategoryTransactionsForWeek(categoryTransactionId: number, unit: string): Observable<CategoryTransaction[]> {
    return this.http.get<CategoryTransaction[]>(this.url + '/getCategoryTransactionsForWeek/' + categoryTransactionId + '/' + unit, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }


  getCategoryTransactionsForMonth(categoryTransactionId: number, unit: string): Observable<CategoryTransaction[]> {
    return this.http.get<CategoryTransaction[]>(this.url + '/getCategoryTransactionsForMonth/' + categoryTransactionId + '/' + unit, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getCategoryTransactionsForYear(categoryTransactionId: number, unit: string): Observable<CategoryTransaction[]> {
    return this.http.get<CategoryTransaction[]>(this.url + '/getCategoryTransactionsForYear/' + categoryTransactionId + '/' + unit, this.httpOptions)
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
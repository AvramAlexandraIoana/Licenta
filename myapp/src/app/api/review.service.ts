import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Review } from '../_models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  url: string;
  httpOptions: { headers: HttpHeaders; };
  token: string;
  constructor(private http: HttpClient) {
    this.url = environment.url + '/review';
    this.token = localStorage.getItem('token');
    this.httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':  `Bearer ${this.token}`
      })
    };
   }

   saveReview(review: any) {
    return this.http.post<Review>(this.url + '/new', JSON.stringify(review), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );

  }

  getReviewsList(): Observable<Review[]> {
    return this.http.get<Review[]>(this.url + '/index', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getReviewsIndex(): Observable<Review[]> {
    return this.http.get<Review[]>(this.url + '/reviewIndex', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getReviewsSkip(num1: number, num2: number, sort: number, filter: string): Observable<Review[]> {
    return this.http.get<Review[]>(this.url + '/reviewIndex/' + num1 + '/' + num2 + '/' + sort + '/' + filter, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getReviewsFilter(name: string): Observable<Review[]> {
    return this.http.get<Review[]>(this.url + '/filter/', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }


  deleteReview(reviewId: number): Observable<Review> {
    return this.http.delete<Review>(this.url + '/delete/' + reviewId, this.httpOptions)
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

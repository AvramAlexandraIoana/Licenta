import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Limitation } from '../_models/Limitation';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LimitationService {
  url: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.url = environment.url + '/limitationCategory';

   }

   saveLimit(limit: any) {
    return this.http.post<Limitation>(this.url + '/new', JSON.stringify(limit), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );

  }

  getLimitList(): Observable<Limitation[]> {
    return this.http.get<Limitation[]>(this.url + '/index', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }


  deleteContact(limitationId: number): Observable<Limitation> {
    return this.http.delete<Limitation>(this.url + '/delete/' + limitationId, this.httpOptions)
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

import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RecentSearch } from '../_models/RecentSearch';

@Injectable({
  providedIn: 'root'
})
export class RecentSearchService {

  url: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.url = environment.url + '/recentSearch';

   }

   saveRecentSearch(recentSearch: any) {
    return this.http.post<RecentSearch>(this.url + '/new', JSON.stringify(recentSearch), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );

  }

  getRecentSearchList(): Observable<RecentSearch[]> {
    return this.http.get<RecentSearch[]>(this.url + '/index', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }


  deleteRecentSearch(recentSearchId: number): Observable<RecentSearch> {
    return this.http.delete<RecentSearch>(this.url + '/delete/' + recentSearchId, this.httpOptions)
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

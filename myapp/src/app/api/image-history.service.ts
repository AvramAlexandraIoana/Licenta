import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HistoryImage } from '../_models/HistoryImage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageHistoryService {

  url: string;
  token: any;
  httpOptions: { headers: HttpHeaders; };

  constructor(private http: HttpClient) {
    this.url = environment.url + '/historyImage';
    this.token = localStorage.getItem('token');
    this.httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':  `Bearer ${this.token}`
      })
    };

   }

   saveHistoryImage(historyImage: any) {
    return this.http.post<HistoryImage>(this.url + '/new', JSON.stringify(historyImage), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );

  }

  getHistoryImageList(): Observable<HistoryImage[]> {
    return this.http.get<HistoryImage[]>(this.url + '/index', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }


  deleteHistoryImage(historyImageId: number): Observable<HistoryImage> {
    return this.http.delete<HistoryImage>(this.url + '/delete/' + historyImageId, this.httpOptions)
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

import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/Message';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  url: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.url = environment.url + '/messages';

   }

   saveMessage(message: any) {
    return this.http.post<Message>(this.url + '/new', JSON.stringify(message), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );

  }

  getMessageList(userId1: number, userId2: number): Observable<Message[]> {
    return this.http.get<Message[]>(this.url + '/index/' + userId1 + '/' + userId2, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getRecentSearch(userId: number) {
    return this.http.get<Message[]>(this.url + '/getRecentSearchesList/' + userId , this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getUsersList(userId1: number,): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/getUsersIds/' + userId1, this.httpOptions)
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

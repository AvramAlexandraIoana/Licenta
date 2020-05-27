import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import {map, retry, catchError} from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/User';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { Value } from '../_models/Value';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
 
  constructor(private http: HttpClient) {
      this.url = environment.url + '/users';
  }

  // getValuesList(): Observable<Value[]> {
  //   return this.http.get<Value[]>(this.url, this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.errorHandler)
  //   );
  // }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.url, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(this.url  + '/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updateUser(userId: number, user): Observable<User> {
    return this.http.put<User>(this.url + '/edit/' + userId, JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getUsersSkip(num1: number, num2: number, name: string): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/index/' + num1 + '/' + num2 + '/' + name, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  deleteUser(userId: number): Observable<User> {
    return this.http.delete<User>(this.url + '/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }


  getFrecventUserTransaction(userId: number): Observable<any> {
    return this.http.get<any>(this.url + '/userTransactions/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getImageNameFromDatabase(userId: number) {
    return this.http.get<string>(this.url + '/getImagePath/' + userId, this.httpOptions)
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
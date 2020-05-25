import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserAdmin } from '../_models/UserAdmin';
import { environment } from 'src/environments/environment';
import { Role } from '../_models/Role';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = "https://192.168.43.213:5001/api/admin/";
  token: string;
  url: string;
  httpOptions: { headers: HttpHeaders; };



  constructor(private http: HttpClient) { 
    this.url = environment.url;
    this.token = localStorage.getItem('token');
    this.httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':  `Bearer ${this.token}`
      })
    };
  }

 
  getUsersWithRoles(): Observable<UserAdmin[]> {
    return this.http.get<UserAdmin[]>(this.url + '/admin/usersWithRoles', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }


  editUserRole(userName: string, roles: any) {
    return this.http.post(this.url + '/admin/editRoles/' + userName, roles,  this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getRoles(userId: number): Observable<Role[]> {
    return this.http.get<Role[]>(this.url + '/admin/getRoles/' + userId, this.httpOptions)
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

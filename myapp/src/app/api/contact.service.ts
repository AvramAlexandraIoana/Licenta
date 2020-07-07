import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { ContactDB } from '../_models/ContactDB';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url: string;
  httpOptions: { headers: HttpHeaders; };
  token: string;
  constructor(private http: HttpClient) {
    this.url = environment.url + '/contacts';
    this.token = localStorage.getItem('token');
    this.httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':  `Bearer ${this.token}`
      })
    };
   }

   saveContact(contact: any) {
    return this.http.post<ContactDB>(this.url + '/new', JSON.stringify(contact), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );

  }

  getContactList(): Observable<ContactDB[]> {
    return this.http.get<ContactDB[]>(this.url + '/index', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }


  deleteContact(contactId: number): Observable<ContactDB> {
    return this.http.delete<ContactDB>(this.url + '/delete/' + contactId, this.httpOptions)
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/Category';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string;
  token: string;
  httpOptions: { headers: HttpHeaders; };
  constructor(private http: HttpClient) {
    this.url = environment.url + '/category';
    this.token = localStorage.getItem('token');
    this.httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization':  `Bearer ${this.token}`
      })
    };

   }

   saveCategory(category: any) {
    return this.http.post<Category>(this.url + '/new', JSON.stringify(category), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );

  }

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/index', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updateCategory(categoryId: number, category): Observable<Category> {
    return this.http.put<Category>(this.url + '/edit/' + categoryId, JSON.stringify(category), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  deleteCategory(categoryId: number): Observable<Category> {
    return this.http.delete<Category>(this.url + '/delete/' + categoryId, this.httpOptions)
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

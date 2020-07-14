import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  token: string;
  httpOptions: { headers: HttpHeaders; };

  constructor(private http: HttpClient) { 

    this.baseUrl = environment.url + '/auth/';
    if (!this.decodedToken) {
      var userToken = localStorage.getItem('token');
      if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        console.log(this.decodedToken);
      }
      this.token = localStorage.getItem('token');
      this.httpOptions  = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization':  `Bearer ${this.token}`
        })
      };
    }
  }
  ng
  googleLogin(model: any) {
    return this.http.post(this.baseUrl + 'googleLogin', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) })
    .pipe(
      map((response: any) => {
        const  user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        
          
        }
      })
    )
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) })
    .pipe(
      map((response: any) => {
        const  user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        
          
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }
    )
    .pipe(
      map( (response: any) => {
        const user = response;
        if (user) {
          console.log("Ioana");
        }
      })
    )
  }

  forgotPassword(email: string) {
    return this.http.post(this.baseUrl + 'forgotPassword', email, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) })
            .pipe(
              map( (response: any) => {
                const user = response;
                if (user) {
                  console.log("Ioana");
                }
              })
            )
  }

  resetPassword(model: string) {
    return this.http.post(this.baseUrl + 'resetPassword', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) })
            .pipe(
              map( (response: any) => {
                const user = response;
                if (user) {
                  console.log("Ioana");
                }
              })
            )
  }
  
  resetPasswordFromProfile(model: string) {
    return this.http.post(this.baseUrl + 'resetPasswordFromProfile', model, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) })
            .pipe(
              map( (response: any) => {
                const user = response;
                if (user) {
                  console.log("Ioana");
                }
              })
            )
  }

  uploadProfileImage(formData: FormData) {
    return this.http.post(this.baseUrl + 'uploadImage', formData, { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) })
    .pipe(
      map( (response: any) => {
        const user = response;
        if (user) {
          console.log("Ioana");
        }
      })
    )
  }



  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getRoles(userId: number) {
    return this.http.get<any[]>(this.baseUrl + 'getRoles/' + userId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  roleMatch(allowedRoles, userRoles): boolean {
    if (!this.decodedToken) {
      var userToken = localStorage.getItem('token');
      if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        console.log(this.decodedToken);
      }
    }
    let isMatch = false;
    if (allowedRoles) {
      allowedRoles.forEach(element => {
        if(userRoles) {
          if (userRoles.includes(element)) {
            isMatch = true;
            return;
          }
        }
       
      });

    }
    

    return isMatch;
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

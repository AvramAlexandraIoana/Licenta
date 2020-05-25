import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { 

    this.baseUrl = environment.url + '/auth/';
    if (!this.decodedToken) {
      var userToken = localStorage.getItem('token');
      if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        console.log(this.decodedToken);
      }
    }
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

  roleMatch(allowedRoles): boolean {
    if (!this.decodedToken) {
      var userToken = localStorage.getItem('token');
      if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        console.log(this.decodedToken);
      }
    }
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>
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
}

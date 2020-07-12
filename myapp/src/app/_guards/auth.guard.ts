import { Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../api/auth.service';

@Injectable( {
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router) {

    }
    canActivate() : boolean {
        if (this.authService.loggedIn()) {
            console.log("logat");
            return true;
        }
        console.log("Nu este voie");
    }

}
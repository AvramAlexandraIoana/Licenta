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
    canActivate(next: ActivatedRouteSnapshot) : boolean {
        const roles = next.firstChild.data['roles'] as Array<string>;
        console.log("roluri");
        console.log(roles);
        if (roles) {
            const match = this.authService.roleMatch(roles, ["Member"]);
            if (match) {
                return true;
            } else {
                console.log("nu e bine");
            }

        }
        if (this.authService.loggedIn()) {
            console.log("logat");
            return true;
        }
        console.log("Nu este voie");
    }

}
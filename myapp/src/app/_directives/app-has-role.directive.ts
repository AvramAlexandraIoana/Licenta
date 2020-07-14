import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Directive({
  selector: '[appAppHasRole]'
})
export class AppHasRoleDirective {

  @Input() appAppHasRole: string[];
  isVisible = false;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  userId: number;


  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService) {
     
     }

    ngOnInit() {
      if (this.authService.decodedToken) {
        var userRoles = this.authService.decodedToken.role as Array<string>;
        console.log('Role');
        console.log(userRoles);
        var userToken = localStorage.getItem('token');
        if (userToken) {
            this.decodedToken = this.jwtHelper.decodeToken(userToken);
            this.userId =  Number(this.decodedToken.nameid);
        }
        this.authService.getRoles(this.userId).subscribe(res => {
          userRoles = res;
          console.log(res);
          // if no roles clear the viewContainerRef
           if (!userRoles) {
              //this.isVisible = false;
              this.viewContainerRef.clear();
           }
    
            // if user has role need then render the element
           if (this.authService.roleMatch(this.appAppHasRole, userRoles)) {
              if (!this.isVisible) {
                this.isVisible = true;
                this.viewContainerRef.createEmbeddedView(this.templateRef);
              } else {
                this.isVisible = false;
                this.viewContainerRef.clear();
              }
            } else {
              this.isVisible = false;
              this.viewContainerRef.clear();
            }
        })
      

      }
     
    }
}

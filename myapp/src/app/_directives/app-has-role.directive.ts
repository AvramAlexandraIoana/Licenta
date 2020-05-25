import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthService } from '../api/auth.service';

@Directive({
  selector: '[appAppHasRole]'
})
export class AppHasRoleDirective {

  @Input() appAppHasRole: string[];
  isVisible = false;

  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService) {
     
     }

    ngOnInit() {
      if (this.authService.decodedToken) {
        const userRoles = this.authService.decodedToken.role as Array<string>;
        console.log('Role');
        console.log(userRoles);
        // if no roles clear the viewContainerRef
        if (!userRoles) {
          //this.isVisible = false;
          this.viewContainerRef.clear();
        }
  
        // if user has role need then render the element
        if (this.authService.roleMatch(this.appAppHasRole)) {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          } else {
            this.isVisible = false;
            this.viewContainerRef.clear();
          }
        }

      }
     
    }
}

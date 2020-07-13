import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { HomePage } from './home/home.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { ResetPasswordPage } from './reset-password/reset-password.page';
import { AuthService } from './api/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Users Details',
      url: 'users-details',
      icon: 'list',
      allowed: false
    },
    {
      title: 'Review-list',
      url: 'review-list' ,
      icon: 'list',
      allowed: false
    },
    {
      title: 'Category',
      url: 'category',
      icon: 'list',
      allowed: false
    },
    {
      title: 'Set amount user',
      url: 'manager-transfer-money',
      icon: 'list',
      allowed: false

    }
  ]
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private deeplinks: Deeplinks,
    private navControl:NavController,
    private authService: AuthService
  ) {
    this.initializeApp();
    if (this.authService.decodedToken) {
      const userRoles = this.authService.decodedToken.role as Array<string>;
      console.log('Role');
      console.log(userRoles);
      this.appPages[0].allowed = this.authService.roleMatch(['Admin']);
      this.appPages[1].allowed = this.authService.roleMatch(['Admin']);
      this.appPages[2].allowed = this.authService.roleMatch(['Store-Manager']);
      this.appPages[3].allowed = this.authService.roleMatch(['Store-Manager']);
      console.log(this.appPages[0].allowed);

    }
   
  }

 

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.deeplinks.route({
        '/reset-password': ResetPasswordPage
      
      }).subscribe(match => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        console.log('Successfully matched route', match);
        if (match.$link.path == '/reset-password') {
          this.navControl.navigateRoot('reset-password');
        }

      }, nomatch => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
      });
    
    });
  }

  initComponent() {
    console.log("INIT");
  }
}

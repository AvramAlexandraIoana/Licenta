import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { HomePage } from './home/home.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { ResetPasswordPage } from './reset-password/reset-password.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: 'tab1',
      icon: 'home'

    }, 
    {
      title: 'Request',
      url: 'request',
      icon: 'list'
    },
    {
      title: 'Users Details',
      url: 'users-details',
      icon: 'list'
    },
    {
      title: 'Category',
      url: 'category'
    },
    {
      title: 'Forgot Password',
      url: 'forgot-password'
    },
    {
      title: 'Recover Password',
      url: 'reset-password'
    },
    {
      title: 'Messages',
      url: 'chat-history'
    },
    {
      title: 'Notifications',
      url: 'notifications'
    },
    {
      title: 'Review-list',
      url: 'review-list' 
    },
    {
      title: 'Set amount user',
      url: 'manager-transfer-money'
    }
  ]
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private deeplinks: Deeplinks,
    private navControl:NavController
  ) {
    this.initializeApp();
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
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { AppHasRoleDirective } from './_directives/app-has-role.directive';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { Contacts } from  '@ionic-native/contacts';
import { CallNumber } from  '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';

import { Keyboard } from '@ionic-native/keyboard/ngx';


import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import firebaseConfig from './firebase'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule} from '@angular/fire/auth'
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { ReactiveFormsModule } from '@angular/forms';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const configS: SocketIoConfig = { url: 'https://LegalTatteredCone--five-nine.repl.co', options: {} };

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('224422307708-16aaplgh5tbjpq99l2s1g3ha6po9r9na.apps.googleusercontent.com')
  }
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider('561602290896109')
  // }
]);



export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    NgxDatatableModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(configS),
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    NgbModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule


  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    GooglePlus,
    StatusBar,
    SplashScreen,
    NativeStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Deeplinks,
    Contacts,
    CallNumber,
    SMS,
    Keyboard,
    Camera,
    File,
    WebView,
    FilePath,
    FileOpener,
    AndroidPermissions

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

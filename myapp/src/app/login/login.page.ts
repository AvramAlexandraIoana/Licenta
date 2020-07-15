import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, AlertController, Platform, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from 'src/environments/environment';
import { AuthService } from '../api/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm : FormGroup;
  model: any = {};

  errorMessages = {
    'username':[
      { type:'required', message: 'Username is required'},
      { type:'minlength', message: 'Username lenght must be longer than or equal to 6 characters '},
      { type:'maxlength', message: 'Username lenght Cannot exceed 20 characters '},
      { type:'pattern', message: 'Please enter valid Username format '}
    ],
    'password':[
      { type:'required', message: 'Password is required'},
      { type:'minlength', message: 'Password lenght must be longer than or equal to 6 characters '},
      { type:'maxlength', message: 'Password lenght Cannot exceed 15 characters '},
      { type:'pattern', message: 'Password must contain numbers,uppercase and lowercase letters '}
    ]
  }
  user: any;
  language: string;


  constructor(  private googlePlus: GooglePlus,
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private router: Router,
    private platform: Platform,
    public alertController: AlertController,
    public formBuilder: FormBuilder, 
    private auth: AuthService, 
    private navControl: NavController,
    private toastController: ToastController) { 
    this.createLoginForm();
  }

  ngOnInit() {
    this.language = localStorage.getItem("limba");
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      'username': ['', [Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9_.+-]+$')]],

      'password': ['', [ Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
    })
  }
  async presentToast(text, type) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000,
        color: type
    });
    toast.present();
  }


  login() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.controls['username'].value);
    
    this.model = {
      'Username': this.loginForm.controls['username'].value,
      'Password': this.loginForm.controls['password'].value
    }
    this.auth.login(this.model).subscribe( next => {
      console.log("Logged in successfully");
      this.presentToast('Log in succesfully.', "success");
      this.navControl.navigateRoot('tabs/tab1');
    }, error => {
      this.presentToast('An error ocurred.', "danger");
      console.log(error);
    })
  
  }

  goSignup()
  {
    this.navControl.navigateForward('signup');
  }

  doGoogleLogout(){
    this.googlePlus.logout()
    .then(res => {
      //user logged out so we will remove him from the NativeStorage
      this.nativeStorage.remove('google_user');
      this.router.navigate(["/login"]);
    }, err => {
      console.log(err);
    });
  }

  async doGoogleLogin(){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    this.googlePlus.login({
      'scopes': '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': environment.googleWebClientId, // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      //'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then(user => {
        console.log("UTILIZATOR");
        console.log(user);
        this.user = user;
        //save user data on the native storage
        this.nativeStorage.setItem('google_user', {
          name: user.displayName,
          email: user.email,
          picture: user.imageUrl
        })
        .then(() => {
          //  this.router.navigate(["user"]);
          localStorage.setItem("googleLogin", "1");
          this.model = {
            'Username': user.givenName,
            'Email': user.email,
            'Password': 'googleLogin'
          }
          this.auth.googleLogin(this.model).subscribe(res => {
            console.log("Logged in successfully");
            this.navControl.navigateRoot('tabs/tab1');
          })
        }, (error) => {
          console.log(error);
        })
        loading.dismiss();
      }, err => {
        console.log(err);
        if(!this.platform.is('cordova')){
          this.presentAlert();
        }
        loading.dismiss();
      })
    
    .catch(err => console.error(err));
  }

  async presentAlert() {
    const alert = await this.alertController.create({
       message: 'Cordova is not available on desktop. Please try this in a real device or in an emulator.',
       buttons: ['OK']
     });

    await alert.present();
  }


  async presentLoading(loading) {
    return await loading.present();
  }

  goToForgotPassword() {
    this.navControl.navigateRoot('forgot-password');
  }



}
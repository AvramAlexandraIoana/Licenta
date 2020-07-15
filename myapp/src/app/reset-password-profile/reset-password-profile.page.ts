import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../api/auth.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password-profile',
  templateUrl: './reset-password-profile.page.html',
  styleUrls: ['./reset-password-profile.page.scss'],
})
export class ResetPasswordProfilePage implements OnInit {

  resetForm: FormGroup;
  jwtHelper = new JwtHelperService();
  errorMessages = {
    'password':[
      { type:'required', message: 'New password este obligatorie'},
      { type:'minlength', message: 'New password trebuie sa aiba cel putin 6 caractere '},
      { type:'maxlength', message: 'New password trebuie sa aiba cel mult 12 caractere '},
      { type:'pattern', message: 'New password trebuie sa contina numere, litere mari si litere mici '}
    ],
    'confirmPassword':[
      { type:'required', message: 'Confirm password este obligatorie'},
      { type:'minlength', message: 'Confirm password trebuie sa aiba cel putin 6 caractere '},
      { type:'maxlength', message: 'Confirm password trebuie sa aiba cel mult 12 caractere  '},
      { type:'pattern', message: 'New password trebuie sa contina numere, litere mari si litere mici '}
    ]
  }
  errorList: string = null;
  model: any;
  decodedToken: any;
  language: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
               private navControl: NavController,
               private toastController: ToastController) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      'password': ['', [ Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(12),
                        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      'confirmPassword': ['', [ Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(12),
                        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
    },  {
      validator: MustMatch('password', 'confirmPassword')
    })

    this.language = localStorage.getItem("limba");
  }

  get f() { return this.resetForm.controls; }


  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

  verifyError(elem: string) {
    var number  = 0;
    for (var i = 0; i < this.errorMessages.password.length; i++) {
        var error = this.errorMessages.password[i];
        if (this.resetForm.get(elem).hasError(error.type) &&  (this.resetForm.get(elem).dirty || this.resetForm.get(elem).touched)) {
         number += 1;
        }
    }
    return number;
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

  changePassword() {
    if (this.resetForm.invalid) {
      return;
    }

    this.model = {
      'Id': this.getUserId(),
      'Password': this.resetForm.controls['password'].value,
      'ConfirmPassword': this.resetForm.controls['confirmPassword'].value
    }

    this.authService.resetPasswordFromProfile(this.model).subscribe(res => {
      console.log("Success");
      if (this.language == "engleza") {
        this.presentToast('Password changed succesfully.', "success");
      } else {
        this.presentToast('Parola schimbata.', "success");
      }
      this.navControl.navigateBack("tabs/tab5");

    });

  }

  changeConfirmPassword() {
    this.errorList = null;
    if ( this.resetForm.controls['password'].value  !== this.resetForm.controls['confirmPassword'].value) {
        this.errorList = 'Passwords must match';
    }
    console.log(this.errorList);
  }


  

}

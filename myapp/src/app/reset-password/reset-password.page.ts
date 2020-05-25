import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../api/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  resetForm: FormGroup;
  jwtHelper = new JwtHelperService();
  heightContainer = 380;
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
  model: any;
  decodedToken: any;
  hasError1: boolean;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

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
    })
  }


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
  
  changePassword() {
    if (this.resetForm.invalid) {
      return;
    }

    this.model = {
      'Password': this.resetForm.controls['password'].value,
      'ConfirmPassword': this.resetForm.controls['confirmPassword'].value
    }

    this.authService.resetPassword(this.model).subscribe(res => {
     //this.toastr.success('Hello world!', 'Toastr fun!');

    });

    


  }

}

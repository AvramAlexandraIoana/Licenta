import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../api/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotForm:  FormGroup;

  errorMessages = {
    'email':[
      { type:'required', message: 'Email este obligatoriu'},
      { type:'minlength', message: 'Email-ul trebuie sa aiba cel putin 10 caractere'},
      { type:'maxlength', message: 'Email-ul trebuie sa aiba cel mult 40 caractere '},
      { type:'email', message: 'Te rog sa introduci o adresa de email valida'}
    ]
  }
  model: any;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private navControl: NavController) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      'email': ['', [Validators.required, 
                    Validators.email,  
                    Validators.minLength(10),
                    Validators.maxLength(40)]]
    })
  }

  forgotPassword() {
    if (this.forgotForm.invalid) {
      return;
    }

    this.model = {
      'Email': this.forgotForm.controls['email'].value,
    }

    this.authService.forgotPassword(this.model).subscribe(res => {
      console.log("Email forgot");
      this.goToForgotPasswordConfirmation();
     //this.toastr.success('Hello world!', 'Toastr fun!');

    });
  }

  goToForgotPasswordConfirmation() {
    this.navControl.navigateRoot("forgot-password-confirmation");
  }

}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})


export class SignupPage implements OnInit {

  signupForm : FormGroup;
  model: any = {};

  errorMessages = {
    'username':[
      { type:'required', message: 'Username is required'},
      { type:'minlength', message: 'Username lenght must be longer than or equal to 6 characters '},
      { type:'maxlength', message: 'Username lenght Cannot exceed 20 characters '},
      { type:'pattern', message: 'Please enter valid Username format '}
    ],
    'email':[
      { type:'required', message: 'Email is required'},
      { type:'minlength', message: 'Email lenght must be longer than or equal to 6 characters '},
      { type:'maxlength', message: 'Email lenght Cannot exceed 20 characters '},
      { type:'pattern', message: 'Please enter valid email format '}
    ],
    'password':[
      { type:'required', message: 'Password is required'},
      { type:'minlength', message: 'Password lenght must be longer than or equal to 6 characters '},
      { type:'maxlength', message: 'Password lenght Cannot exceed 10 characters '},
      { type:'pattern', message: 'Password must contain numbers,uppercase and lowercase letters '}
    ]
  }
  language: string;

  constructor(public formBuilder: FormBuilder, private auth: AuthService, private navControl: NavController) { 
    this.createSignupForm();
  }

  ngOnInit() {
    this.language = localStorage.getItem("limba");
  }

  createSignupForm() {
    this.signupForm = this.formBuilder.group({
      'username': ['', [Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength(20),
                        Validators.pattern('^[a-zA-Z0-9_.+-]+$')]],
      'email': ['', [Validators.required,
                      Validators.minLength(10),
                      Validators.maxLength(30),
                      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9.-]+$')]],
      'password': ['', [ Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(12),
                        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
    })
  }

  signup() {
       // stop here if form is invalid
      if (this.signupForm.invalid) {
        return;
      }
      
      this.model = {
        'Username': this.signupForm.controls['username'].value,
        'Email': this.signupForm.controls['email'].value,
        'Password': this.signupForm.controls['password'].value
      }
      this.auth.register(this.model).subscribe( next => {
        console.log("Regster in successfully");
        this.goToLoginPage();
      
      }, error => {
        console.log(error);
      })
  }

  goToLoginPage() {
    this.navControl.navigateRoot('login');
  }


 

}

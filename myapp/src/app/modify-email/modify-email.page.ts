import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-modify-email',
  templateUrl: './modify-email.page.html',
  styleUrls: ['./modify-email.page.scss'],
})
export class ModifyEmailPage implements OnInit {


  modifyEmailForm: FormGroup;
  typeView: any;
  user = new User();

  errorMessages = {
    'email':[
      { type:'required', message: 'E-mail-ul este obligatoriu'},
      { type:'minlength', message: 'Lungimea e-mail-ului trebuie sa aiba cel putin 10 caractere '},
      { type:'maxlength', message: 'Lungimea e-mail-ului trebuie sa aiba cel mult 50 caractere'},
      { type:'pattern', message: 'Te rugam introduce o adresa de e-mail valida '}
    ]
  }
  
  constructor( private route: ActivatedRoute, 
              private formBuilder: FormBuilder,
              private navControl: NavController,
              private toastController: ToastController,
              private userService: UserService,
              private modalControl: ModalController) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.typeView = params["type"];
      if (params && params.special) {
        this.user = JSON.parse(params.special);
        console.log(this.user);
      }
    });

    this.createEmailForm();
    
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

  createEmailForm() {
    this.modifyEmailForm = this.formBuilder.group({
      'email': [this.user.email, [Validators.required,
                  Validators.minLength(10),
                  Validators.maxLength(50),
                  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9.-]+$')]]
    });
  }

  goToModifyProfile() {
    this.navControl.navigateRoot('modify-profile');
  }

  changeEmail() {
    if (this.modifyEmailForm.invalid) {
      return;
    }

    var user = new User();
    this.user.email =  this.modifyEmailForm.controls['email'].value;
    console.log(this.user);
    this.userService.updateUser(this.user.id, this.user).subscribe( next => {
       this.presentToast("Adresa  de e-mail modificata!", "success");
       this.dismiss();
       //this.navControl.navigateRoot('modify-profile');

    }, error => {
      this.presentToast("S-a produs o eroare!", "warning");
      console.log(error);
    })
  }


  dismiss() {
    this.navControl.navigateBack("modify-profile");
   }
}

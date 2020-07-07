import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-modify-full-name',
  templateUrl: './modify-full-name.page.html',
  styleUrls: ['./modify-full-name.page.scss'],
})
export class ModifyFullNamePage implements OnInit {

  myDate: String = new Date().toISOString();
  maxYear = (new Date()).getFullYear();
  fullNameForm: FormGroup;
  typeView: any;
  user = new User();

  errorMessages = {
    'username':[
      { type:'required', message: 'Username-ul este obligatoriu'},
      { type:'minlength', message: 'Lungimea Username-ul trebuie sa aiba cel putin 10 caractere '},
      { type:'maxlength', message: 'Lungimea Username-ul trebuie sa aiba cel mullt 20 caractere'},
      { type:'pattern', message: 'Te rugam introduce un username valid'}
    ]
  }
  language: string;
  


  constructor(private navControl: NavController,
              private toastController: ToastController,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
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
    this.language = localStorage.getItem("limba");

    this.createFullNameForm();
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


  createFullNameForm() {
    this.fullNameForm = this.formBuilder.group({
      'username': [this.user.userName,  [Validators.required,
                                        Validators.minLength(10),
                                        Validators.maxLength(20),
                                        Validators.pattern('^[a-zA-Z0-9_.+-]+$')]],
      'dateOfBirth': [this.user.dateOfBirth, [Validators.required]]
    });
  }

  mofifyFullName() {
    if (this.fullNameForm.invalid) {
      return;
    }

    var user = new User();
    this.user.userName =  this.fullNameForm.controls['username'].value;
    this.user.dateOfBirth =  this.fullNameForm.controls['dateOfBirth'].value;

    console.log(this.user);
    this.userService.updateUser(this.user.id, this.user).subscribe( next => {
       this.presentToast("Username modificat!", "success");
       //this.navControl.navigateRoot('modify-profile');
       this.dismiss();

      }, error => {
        this.presentToast("S-a produs o eroare!", "warning");
        console.log(error);
      })
  }


  goToModifyProfile() {
    this.navControl.navigateRoot('modify-profile');
  }

  dismiss() {
    this.navControl.navigateBack("modify-profile");
   }
}

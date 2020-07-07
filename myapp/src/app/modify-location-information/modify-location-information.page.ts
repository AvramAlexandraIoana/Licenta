import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-modify-location-information',
  templateUrl: './modify-location-information.page.html',
  styleUrls: ['./modify-location-information.page.scss'],
})
export class ModifyLocationInformationPage implements OnInit {

  isEnterAdress1Input = false;
  isEnterAdress2Input = false;
  modifyLocationForm: FormGroup;
  typeView: any;
  user =  new User();

  errorMessages = {
    'country':[
      { type:'required', message: 'Tara este obligatorie'},
    ],
    'postalCode': [
      { type:'required', message: 'Codul postal este obligatoriu'}
    ],
    'adress':[
      { type:'required', message: 'Adresa randul 1 este obligatorie'}
    ],
    'city':[
      { type:'required', message: 'Orasul este obligatoriu'}
    ], 
    'judet': [
      { type: 'required', message: 'Regiunea este obligatorie'}
    ]
  }


  constructor(private toastController: ToastController,
              private userService: UserService,
              private route: ActivatedRoute, 
              private navControl: NavController, 
              private formBuilder: FormBuilder,
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
    this.createModifyForm();
  }

  createModifyForm() {
    this.modifyLocationForm = this.formBuilder.group({
      'country': [this.user.country, [Validators.required]],
      'postalCode': [this.user.postalCode,  Validators.required],
      'adress': [this.user.adress, [ Validators.required]],
      'adress1': [this.user.adress1],
      'city': [this.user.city, [Validators.required]],
      'judet': [this.user.judet, [Validators.required]]
    })
  }

  goToModifyProfile() {
    this.navControl.navigateRoot('modify-profile');
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

  modifyLocationInformation() {
        // stop here if form is invalid
      if (this.modifyLocationForm.invalid) {
          return;
      }
      var user = new User();
      this.user.country =  this.modifyLocationForm.controls['country'].value;
      this.user.postalCode =  this.modifyLocationForm.controls['postalCode'].value;
      this.user.adress = this.modifyLocationForm.controls['adress'].value;
      this.user.adress1 = this.modifyLocationForm.controls['adress1'].value;
      this.user.city =  this.modifyLocationForm.controls['city'].value;
      this.user.judet = this.modifyLocationForm.controls['judet'].value;
      console.log(this.user);
      this.userService.updateUser(this.user.id, this.user).subscribe( next => {
         this.presentToast("Adresa modificata!", "success");
         //this.navControl.navigateRoot('modify-profile');
         this.dismiss();

      }, error => {
        this.presentToast("S-a produs o eroare!", "warning");
        console.log(error);
      })
  }

  dismiss() {
   this.navControl.navigateBack("modify-profile");
  }


}

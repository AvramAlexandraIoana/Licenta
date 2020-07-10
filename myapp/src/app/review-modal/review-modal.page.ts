import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ModalController, NavParams, NavController, ToastController } from '@ionic/angular';
import { AdminService } from '../api/admin.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.page.html',
  styleUrls: ['./review-modal.page.scss'],
})
export class ReviewModalPage implements OnInit {

  availableTypes: any[] =  [
    {name: 'Bug', value: 'Bug'},
    {name: 'Suggestion', value: 'Suggestion'},
    {name: 'Others', value: 'Others'}
  ];
  types: any[] = [];
  userRoles: { [key: string]: any; };
  language: string;
  constructor(private modalControl : ModalController, 
              private navControl : NavController,
              private params: NavParams,
              private toastController: ToastController, 
              private adminService: AdminService) { }

  ngOnInit() {
    this.language = localStorage.getItem("limba");
    if (this.language == 'romana') {
      this.availableTypes[1].name = "Sugestie"; 
      this.availableTypes[2].name = "Altceva"; 
    }
    this.verifiyRolesMatch();
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

  verifiyRolesMatch() {
    this.types = [];
    for (let i = 0;  i< this.availableTypes.length; i++) {
      var element = this.availableTypes[i];
      var findRoles = _.find(this.userRoles, function(object) {
        return object == element.name;
      });
      if (findRoles) {
        this.availableTypes[i].checked = true;
        this.types.push(this.availableTypes[i]);
      } else {
        var elem = localStorage.getItem("type");
        this.availableTypes[i].checked = false;
        if (this.availableTypes[i].name == elem) {
          this.availableTypes[i].checked = true;
        }
        this.types.push(this.availableTypes[i]);
      }
    }

  }

  updateType() {
    var arrayRoles = [];
    for (let i = 0; i < this.types.length; i++) {
      if (this.types[i].checked) {
         arrayRoles.push(this.types[i].name);
      }
    }
    var objectRolesName = {
      "roleNames": arrayRoles
    };

    if (arrayRoles.length > 1) {
      this.presentToast("You can select one of types", "warning");
      return;
    }

    this.dismiss();
    
  }

  dismiss() {
    console.log('save form', this.types);
    this.modalControl.dismiss(this.types);
  }
}

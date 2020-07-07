import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/User';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { AccountService } from '../api/account.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../api/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.page.html',
  styleUrls: ['./change-language.page.scss'],
})
export class ChangeLanguagePage implements OnInit {

  
  typeView: any;
  user = new User();
  jwtHelper = new JwtHelperService();
  userId: number;
  decodedToken: any;
  cards: any;
  languages: any[] =  [
    {name: 'Română', value: 'romana', checked: false},
    {name: 'Engleză', value: 'engleza', checked: false},
  ];
  
  constructor( private route: ActivatedRoute, 
              private formBuilder: FormBuilder,
              private navControl: NavController,
              private toastController: ToastController,
              private userService: UserService,
              private modalControl: ModalController,
              private accountService: AccountService) { }

  ngOnInit() {

    this.userId = this.getUserId();
    this.getUser();
   
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
      console.log(res);
      if (this.user.language == "engleza") {
        this.languages[1].checked = true;
        this.languages[0].name = "Romanian";
        this.languages[1].name = "English";
      } else {
        this.languages[0].checked = true;
      }
    });
  }

  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
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


  goToModifyProfile() {
    this.navControl.navigateRoot('modify-profile');
  }


  changeDefaultCard() {
    console.log("Ioana");
    console.log(this.languages);
    var checkedLanguage = _.filter(this.languages, function(object){
      return object.checked == true;
    });
    console.log(checkedLanguage);
    if (checkedLanguage.length > 1) {
      this.presentToast("Trebuie selectata o singura limba!", "warning");
    } else if (checkedLanguage.length == 1) { 
      this.user.language = checkedLanguage[0].value;
      this.userService.updateUser(this.user.id, this.user).subscribe( res => {
        console.log(res);
        localStorage.setItem("limba", this.user.language);
        this.presentToast("Limba schimbata", "success");
        this.dismiss();
      })

    } else {
      this.presentToast("Trebuie selectata o singura limba!", "warning");

    }
  }


  dismiss() {
    this.navControl.navigateBack("tabs/tab5");
   }
}

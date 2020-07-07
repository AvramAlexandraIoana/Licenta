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
    {name: 'Română', value: 'Română', checked: false},
    {name: 'Engleză', value: 'Engleză', checked: false},
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
    });
  }

  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

  loadDataAccount() {
    this.accountService.getAccountList(this.userId).subscribe(res => {
      console.log(res);
      this.cards = res;
      var u = this.user;
      if (u.defaultCard == "$") {
        u.defaultCard = "USD";
      } else if (u.defaultCard == "€") {
        u.defaultCard = "EURO";
      } else if   (u.defaultCard == "r") {
        u.defaultCard = "RON";
      }
      var index = _.findIndex(this.cards, function(object) {
        return object.conversion == u.defaultCard;
      });
      if(index != -1) {
        this.cards[index].checked = true;
        console.log("ioana");
      }
    });
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
    console.log(this.cards);
    var checkedCards = _.filter(this.cards, function(object){
      return object.checked == true;
    });
    console.log(checkedCards);
    if (checkedCards.length > 1) {
      this.presentToast("Trebuie selectat un singur card!", "warning");
    } else if (checkedCards.length == 1) { 
      if (checkedCards[0].conversion == "USD") {
        this.user.defaultCard = "$";
      } else if   (checkedCards[0].conversion == "EURO") {
        this.user.defaultCard = "€";
      } else if   (checkedCards[0].conversion == "RON") {
        this.user.defaultCard = "r";
      }
      this.userService.updateUser(this.user.id, this.user).subscribe( res => {
        console.log(res);
        localStorage.setItem("card", this.user.defaultCard);
        this.presentToast("Card default salvat", "success");
        this.dismiss();
      })

    } else {
      this.presentToast("Trebuie selectat un  card!", "warning");

    }
  }


  dismiss() {
    this.navControl.navigateBack("tabs/tab5");
   }
}

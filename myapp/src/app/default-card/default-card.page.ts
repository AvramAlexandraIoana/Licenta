import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { UserService } from '../api/user.service';
import { AccountService } from '../api/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'lodash';

@Component({
  selector: 'app-default-card',
  templateUrl: './default-card.page.html',
  styleUrls: ['./default-card.page.scss'],
})
export class DefaultCardPage implements OnInit {

  
  modifyEmailForm: FormGroup;
  typeView: any;
  user = new User();
  jwtHelper = new JwtHelperService();

  errorMessages = {
    'email':[
      { type:'required', message: 'E-mail-ul este obligatoriu'},
      { type:'minlength', message: 'Lungimea e-mail-ului trebuie sa aiba cel putin 10 caractere '},
      { type:'maxlength', message: 'Lungimea e-mail-ului trebuie sa aiba cel mult 50 caractere'},
      { type:'pattern', message: 'Te rugam introduce o adresa de e-mail valida '}
    ]
  }
  userId: number;
  decodedToken: any;
  cards: any;
  language: string;
  
  constructor( private route: ActivatedRoute, 
              private formBuilder: FormBuilder,
              private navControl: NavController,
              private toastController: ToastController,
              private userService: UserService,
              private modalControl: ModalController,
              private accountService: AccountService) { }

  ngOnInit() {

    this.userId = this.getUserId();
    this.language = localStorage.getItem("limba");
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
      console.log(res);
      this.loadDataAccount();
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
      console.log("ioana");
      console.log(index);
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

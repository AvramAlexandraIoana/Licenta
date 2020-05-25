import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { ToastController, NavController, ModalController } from '@ionic/angular';
import { Contacts, Contact, ContactName, ContactField } from  '@ionic-native/contacts';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CreateContactPage } from '../create-contact/create-contact.page';

import * as _ from 'lodash';
import { NavigationExtras } from '@angular/router';
import { AccountService } from '../api/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  sliderConfig={
    spaceBetween:0,
    centeredSlides:true,
    slidesPerView:1.2
  }

  category: any = "day";
  myContacts: Contact[] =[];
  user: any = [];
  typeView: string;
  isActualView: boolean;
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  userId: number;
  cards: Account[];


 

  constructor(private contacts: Contacts,
    private callNumber: CallNumber,
    private sms: SMS,
    public toastController: ToastController,
    private androidPermissions: AndroidPermissions,
    private navControl: NavController,
    private modalControl: ModalController,
    private accountService: AccountService) { 

    }

    ionViewDidLoad() {
      console.log("I'm alive!");
    }


    ionViewDidEnter() {
      console.log("asd");
    }

    ionViewWillEnter(){
      console.log("asd");
  }
  
    ionViewWillLeave(){
      console.log("asd");
    }
  

  ngOnInit() {
    this.userId = this.getUserId();
    console.log("asd");
    this.loadContacts();
    this.loadCards();
  }

  loadCards() {
    this.accountService.getAccountList(this.userId).subscribe( res => {
      console.log(res);
      this.cards = res;
    });

  }

  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

  condition(i: number) {
    if (i < 10) {
      return true;
    }
    return false;
  }

  segmentChanged(ev: any) {
    this.category = ev.detail.value;
    console.log(this.category);
  }

  
  loadContacts() {
    let options = {
      filter: '',
      multiple: true,
      hasPhoneNumber: true
    };

    this.contacts.find(['*'], options).then((contacts: Contact[]) => {
      this.myContacts =  _.reverse(contacts);
      console.log("Contacts:", this.myContacts);
   
    });
  }

 

checkSMSPermission() {
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
    result => console.log('Has permission?', result.hasPermission),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
  );
}
requestSMSPermission() {
  // tslint:disable-next-line: max-line-length
  this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SEND_SMS, this.androidPermissions.PERMISSION.BROADCAST_SMS]);
}

  sendSms(contact: Contact) {
    this.checkSMSPermission();
    this.requestSMSPermission();
    this.checkSMSPermission();

     // CONFIGURATION
    const options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
          intent: ''  // send SMS with the native android SMS messaging
          // intent: '' // send SMS without opening any other app
      }
    };
    this.sms.send(contact.phoneNumbers[0].value, "text", options).then(() => {
      console.log('Success', 'message has been sent');
      this.presentToast("Mesaj trimis", "success");
    })
    .catch(error => {
      this.presentToast(error, "warning");
    });
  }


  call(contact: Contact) {
    this.callNumber.callNumber(contact.phoneNumbers[0].value, true);
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

  createContact() {
    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, "Albus", "Ape");
    contact.phoneNumbers = [ new ContactField("mobile", "123445678")];

    contact.save().then(
       async () => {
         let toast = await this.toastController.create({
           message: "Contact added!"
         });
         toast.present();

       }, 
       (error: any) => console.log("Error saving contact.", error)
      );
  }

  conditionPosition(position: number) {
    if (position % 2 == 0) {
      return true;
    }
    return false;
  }

 addNewContact()
  {
   this.navControl.navigateRoot(["create-contact"]);
  }

  addNewCard() {
    this.navControl.navigateRoot(["add-new-card"]);
    //this.setNavigation(this.typeView, "add-new-card");

  }


  setNavigation(param: string, url: string)  //navigate with parameters
  {

    let navigationExtras: NavigationExtras = {
      queryParams: {
          type: param,
          special: JSON.stringify(this.user)
      }
    };
    
    this.navControl.navigateRoot([url],navigationExtras);
    //this.navControl.navigateBack("request");
  }

}

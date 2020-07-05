import { Component, OnInit, ViewChild } from '@angular/core';
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
import { TransactionService } from '../api/transaction.service';
import { IonSlides } from '@ionic/angular';
import { Transaction } from '../_models/Transaction';
import { CategoryTransactionsService } from '../api/category-transactions.service';

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
  cards: any;
  transactionPerWeek: Transaction[];
  transactionPerMonth: Transaction[];
  transactionPerYear: Transaction[];
  transactionPerDay: any;
  defaultCard: string;
  currentTab = "day";
  myDate: Date;
  
  @ViewChild('slides', {static: true}) slides: IonSlides;
  currentUnit: any;
  categoryTransactonPerWeek: import("t:/Licenta/myapp/src/app/_models/CategoryTransaction").CategoryTransaction[];
  categoryTransactonPerMonth: import("t:/Licenta/myapp/src/app/_models/CategoryTransaction").CategoryTransaction[];
  categoryTransactonPerYear: import("t:/Licenta/myapp/src/app/_models/CategoryTransaction").CategoryTransaction[];
  categoryTransactonPerDay: import("t:/Licenta/myapp/src/app/_models/CategoryTransaction").CategoryTransaction[];
  perDay: number;

  constructor(private contacts: Contacts,
    private callNumber: CallNumber,
    private sms: SMS,
    public toastController: ToastController,
    private androidPermissions: AndroidPermissions,
    private navControl: NavController,
    private modalControl: ModalController,
    private accountService: AccountService,
    private categoryTransactionService: CategoryTransactionsService,
    private transactionService: TransactionService) { 

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
    this.defaultCard = localStorage.getItem("card");
    this.userId = this.getUserId();
    console.log("asd");
    this.myDate = new Date();
    this.loadContacts();
    this.loadCards();
  }

  loadCards() {
    this.accountService.getAccountList(this.userId).subscribe( res => {
      console.log(res);
      this.cards = res;
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].conversion == "USD") {
          this.cards[i].unit = "$";
        } else if (this.cards[i].conversion == "EURO") {
          this.cards[i].unit = "€";
        } else if (this.cards[i].conversion == "RON") {
          this.cards[i].unit = "r";
        }
      }
      this.currentUnit = this.cards[0].unit;
      this.getTransactionPerDay(this.cards[0].unit);
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
    var unit = this.currentUnit;
    if (this.category == "day") {
      this.getTransactionPerDay(unit);
    } else if (this.category == "week") {
      this.getTransactionPerWeek(unit);
    } else if (this.category == "month") {
      this.getTransactionPerMonth(unit);
    } else if (this.category == "year") {
      this.getTransactionPerYear(unit);
    }
  }
  getTransactionPerDay(unit) {
    this.currentTab = "day";
    this.userId = this.getUserId();
    this.transactionService.getTransactionsForToday(this.getUserId(), unit).subscribe( res => {
      this.transactionPerDay = res;
      console.log("Zi");
      console.log(this.transactionPerDay);
      this.getCategoryTransactionPerDay(unit);
        
    });

  }

  verifyType(transaction) {
    console.log(transaction);
    console.log(this.userId);
    if (transaction.userId == this.userId && transaction.isSend) {
      console.log("first");
      return false;
    } else   if (transaction.userId1 == this.userId && transaction.isSend){
      console.log("second");
      return true;
    } else if (transaction.userId == this.userId && !transaction.isSend) {
      return true;
    }
    return false;
  }

  getTransactionPerWeek(unit) {
    this.currentTab = "week";
    this.transactionService.getTransactionsForWeek(this.userId, unit).subscribe( res => {
      this.transactionPerWeek = res;
      console.log("Week");
      console.log(this.transactionPerWeek);
        
    });

  }



  getTransactionPerMonth(unit) {
    this.currentTab = "month";
    this.transactionService.getTransactionsForMonth(this.userId, unit).subscribe( res => {
      this.transactionPerMonth = res;
      console.log("Luna");
      console.log(this.transactionPerDay);
        
    });

  }

  getTransactionPerYear(unit) {
    this.currentTab = "year";
    this.transactionService.getTransactionsForYear(this.userId, unit).subscribe( res => {
      this.transactionPerYear = res;
      console.log("An");
      console.log(this.transactionPerDay);
        
    });

  }

  getCategoryTransactionPerDay(unit) {
    this.categoryTransactionService.getCategoryTransactionsForToday(this.userId, unit).subscribe( res => {
      this.categoryTransactonPerDay = res;
      console.log("Day category");
      console.log(this.categoryTransactonPerDay);
      this.categoryTransactonPerDay.push(this.transactionPerDay);
      console.log(this.categoryTransactonPerDay);
        
    });

  }

  getCategoryTransactionPerWeek(unit) {
    this.categoryTransactionService.getCategoryTransactionsForWeek(this.userId, unit).subscribe( res => {
      this.categoryTransactonPerWeek = res;
      console.log("Week category");
      console.log(this.categoryTransactonPerWeek);
        
    });

  }



  getCategoryTransactionPerMonth(unit) {
    this.categoryTransactionService.getCategoryTransactionsForMonth(this.userId, unit).subscribe( res => {
      this.categoryTransactonPerMonth = res;
      console.log("Luna category");
      console.log(this.categoryTransactonPerMonth);
        
    });

  }

  getCategoryTransactionPerYear(unit) {
    this.categoryTransactionService.getCategoryTransactionsForYear(this.userId, unit).subscribe( res => {
      this.categoryTransactonPerYear = res;
      console.log("Year category");
      console.log(this.categoryTransactonPerYear);
        
    });

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

  deleteCard(card: any) {
    console.log(card);
    console.log(this.cards);
    this.accountService.deleteAccount(card.accountId).subscribe(res => {
      var findCard = _.findIndex(this.cards, function(object) {
        return object.accountId == card.accountId;
      });
      if (findCard != -1) {
        this.cards.splice(findCard, 1);
        console.log(this.cards);
      }
    });
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
 
  slideChanged(e: any) {
    this.slides.getActiveIndex().then((index: number) => {
        console.log(index);
        console.log(this.cards[index]);
        this.currentUnit = this.cards[index].unit;
        if (this.currentTab == "day") {
          this.getTransactionPerDay(this.cards[index].unit);
        } else if (this.currentTab == "week") {
          this.getTransactionPerWeek(this.cards[index].unit);
        } else if (this.currentTab == "month") {
          this.getTransactionPerMonth(this.cards[index].unit);
        } else {
          this.getTransactionPerYear(this.cards[index].unit);
        }
    });
  }

}

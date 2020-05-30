import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../api/transaction.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Transaction } from '../_models/Transaction';
import { NavController } from '@ionic/angular';
import * as _ from 'lodash';
import * as moment from 'moment'
import { User } from '../_models/User';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  gaugeType = "arch";
  gaugeValue : any;
  gaugeLabel = "of $3824";
  gaugePrependText = "$"
  category: any = "day";
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  transactionPerDay: Transaction[];
  todayDate : Date = new Date();
  transactionPerMonth: Transaction[];
  transactionPerYear: Transaction[];
  transactionPerWeek: Transaction[];
  myDate: Date;
  num: number;
  userId: number;
  notifictation: Transaction[];
  user: User;
  money: string;


  constructor(private transactionService: TransactionService,
              private navControl: NavController,
              private userService: UserService) {
    this.getTransactionPerDay();
   }

  ngOnInit() {
    this.userId = this.getUserId();
    this.myDate = new Date();
    console.log(this.myDate);
    this.setAmount();
    this.getNotification();
    this.getSpendMoney();
   
  
  }

  getSpendMoney() {
    this.transactionService.getMoneySpend(this.userId).subscribe( res => {
      console.log(res);
    })
  }

  setAmount() {
    this.userService.getUser(this.userId).subscribe( res => {
      console.log(res);
      this.user = res;
      this.gaugeLabel = "of ";
     
      if (this.user.defaultCard == "r") {
        this.gaugeLabel += 'lei' + this.user.sumaR;
        this.gaugePrependText = "lei";
      } else if (this.user.defaultCard == "$") {
        this.gaugeLabel += '$' + this.user.sumaD;
        this.gaugePrependText = "$";
        this.gaugeValue =  this.user.sumaDSpend * 100 / this.user.sumaD ;
        console.log(this.gaugeValue);
      } else if (this.user.defaultCard == "€") {
        this.gaugeLabel += '€' + this.user.sumaE;
        this.gaugePrependText = "€";

      }

    })
  }


  getNotification() {
    // (transaction.date | date:'ww') == (myDate | date:'ww')
    this.transactionService.getTransactionNotificationNumber(this.userId).subscribe( res => {
      console.log(res);
      this.notifictation = res;
      var currentDate = moment();
      var filtered = this.notifictation.filter(d => moment(d.Date).isSame(currentDate, 'week'));
      this.num = filtered.length;
    });
  }

  goToReview() {
    this.navControl.navigateRoot(["review"]);
  }

  segmentChanged(ev: any) {
    this.category = ev.detail.value;
    if (this.category == "day") {
      this.getTransactionPerDay();
    } else if (this.category == "week") {
      this.getTransactionPerWeek();
    } else if (this.category == "month") {
      this.getTransactionPerMonth();
    } else if (this.category == "year") {
      this.getTransactionPerYear();
    }
  }

  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

  getTransactionPerDay() {
    this.userId = this.getUserId();
    this.transactionService.getTransactionsForToday(this.getUserId()).subscribe( res => {
      this.transactionPerDay = res;
      console.log("Zi");
      console.log(this.transactionPerDay);
        
    });

  }

  verifyType(transaction) {
    if (transaction.userId == this.userId && transaction.isSend) {
      return false;
    } else   if (transaction.userId1 == this.userId && transaction.isSend){
      return true;
    }
  }

  getTransactionPerWeek() {
    this.transactionService.getTransactionsForWeek(this.userId).subscribe( res => {
      this.transactionPerWeek = res;
      console.log("Week");
      console.log(this.transactionPerWeek);
        
    });

  }



  getTransactionPerMonth() {
    this.transactionService.getTransactionsForMonth(this.userId).subscribe( res => {
      this.transactionPerMonth = res;
      console.log("Luna");
      console.log(this.transactionPerDay);
        
    });

  }

  getTransactionPerYear() {
    this.transactionService.getTransactionsForYear(this.userId).subscribe( res => {
      this.transactionPerYear = res;
      console.log("An");
      console.log(this.transactionPerDay);
        
    });

  }

  viewNotifications() {
    this.navControl.navigateRoot(["notifications"]);

  }

  goToChat() {
    this.navControl.navigateRoot(["chat-history"]);
  }




}

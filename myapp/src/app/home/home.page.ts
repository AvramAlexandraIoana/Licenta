import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../api/transaction.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Transaction } from '../_models/Transaction';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  gaugeType = "arch";
  gaugeValue = 28.3;
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


  constructor(private transactionService: TransactionService,
              private navControl: NavController) {
    this.getTransactionPerDay();
   }

  ngOnInit() {
  
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
    var userId = this.getUserId();
    this.transactionService.getTransactionsForToday(userId).subscribe( res => {
      this.transactionPerDay = res;
      console.log("Zi");
      console.log(this.transactionPerDay);
        
    });

  }

  getTransactionPerWeek() {
    var userId = this.getUserId();
    this.transactionService.getTransactionsForToday(userId).subscribe( res => {
      this.transactionPerWeek = res;
      console.log("Week");
      console.log(this.transactionPerWeek);
        
    });

  }



  getTransactionPerMonth() {
    var userId = this.getUserId();
    this.transactionService.getTransactionsForMonth(userId).subscribe( res => {
      this.transactionPerMonth = res;
      console.log("Luna");
      console.log(this.transactionPerDay);
        
    });

  }

  getTransactionPerYear() {
    var userId = this.getUserId();
    this.transactionService.getTransactionsForYear(userId).subscribe( res => {
      this.transactionPerYear = res;
      console.log("An");
      console.log(this.transactionPerDay);
        
    });

  }

  viewNotifications() {
    this.navControl.navigateRoot(["notifications"]);

  }




}

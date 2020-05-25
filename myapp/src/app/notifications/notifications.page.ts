import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../api/transaction.service';
import { CategoryTransaction } from '../_models/CategoryTransaction';
import { CategoryTransactionsService } from '../api/category-transactions.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Transaction } from '../_models/Transaction';
import * as _ from 'lodash';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  userId: number;
  transactions: Transaction[];
  categoryTransactions: CategoryTransaction[];
  groupByTransactions: any;
  transactionsNotificationForToday: Transaction[];
  transactionsNotificationForYestarday: Transaction[];
  transactionsNotificationForThisWeek: Transaction[];
  categoryTransactionsPerToday: CategoryTransaction[];
  categoryTransactionsPerYestarday: CategoryTransaction[];
  categoryTransactionsPerThisWeek: CategoryTransaction[];
  transactionPerDay: Transaction[];
  

  constructor(private transactionService: TransactionService,
              private categoryTransactionService: CategoryTransactionsService) { }

  ngOnInit() {
    this.userId = this.getUserId();
    this.getTransactionPerToday();
    this.getTransactionPerYestarday();
    this.getTransactionPertThisWeek();
    this.getCategoryTransactionPerToday();
    this.getCategoryTransactionPerYestarday();
    this.getCategoryTransactionPerThisWeek();



  }

  getCategoryTransactionPerToday() {
    this.categoryTransactionService.getCategoryTransactionNotificationForToday(this.userId)
        .subscribe(res => {
          console.log("Transactii pe categorie pe azi");
          console.log(res);
          this.categoryTransactionsPerToday = res;
        })
  }

  getCategoryTransactionPerYestarday() {
    this.categoryTransactionService.getCategoryTransactionNotificationForYestarday(this.userId)
    .subscribe(res => {
      console.log("Transactii pe categorie pe ieri");
      console.log(res);
      this.categoryTransactionsPerYestarday = res;
    })
  }

  getCategoryTransactionPerThisWeek() {
    this.categoryTransactionService.getCategoryTransactionNotificationForThisWeek(this.userId)
    .subscribe(res => {
      console.log("Transactii pe categorie pe aceasta saptamana");
      console.log(res);
      this.categoryTransactionsPerThisWeek = res;
    })
  }

  getTransactionPerToday() {
    this.transactionService.getTransactionNotificationForToday(this.userId).subscribe( res => {
      console.log("Tranzactii pe ziua de azi");
      console.log(res);
      this.transactionPerDay = res;
    })

  }

  getTransactionPerYestarday() {
    this.transactionService.getTransactionNotificationForYestarday(this.userId).subscribe( res => {
      console.log("Tranzactii pe ieri");
      console.log(res);
      this.transactionsNotificationForYestarday = res;
    })
  }

  getTransactionPertThisWeek() {
    this.transactionService.getTransactionNotificationForThisWeek(this.userId).subscribe( res => {
      console.log("Tranzactii pe aceasta saptamana!");
      console.log(res);
      this.transactionsNotificationForThisWeek = res;
    })
  }


 
  


  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

}

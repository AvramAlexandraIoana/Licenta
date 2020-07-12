import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../api/transaction.service';
import { CategoryTransaction } from '../_models/CategoryTransaction';
import { CategoryTransactionsService } from '../api/category-transactions.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Transaction } from '../_models/Transaction';
import * as _ from 'lodash';
import { User } from '../_models/User';
import { UserService } from '../api/user.service';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';

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
  myDate: Date;
  user: User;
  response: Transaction;
  language: string;
  

  constructor(private transactionService: TransactionService,
              private categoryTransactionService: CategoryTransactionsService,
              private userService: UserService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.language = localStorage.getItem("limba");
    this.myDate = new Date();
    console.log(this.myDate);
    this.userId = this.getUserId();
    this.userService.getUser(this.userId).subscribe(res => {
      console.log(res);
      this.user = res;
    })
    this.getTransactionPerId();
    // this.getTransactionPerToday();
    // this.getTransactionPerYestarday();
    // this.getTransactionPertThisWeek();
    // this.getCategoryTransactionPerToday();
    // this.getCategoryTransactionPerYestarday();
    // this.getCategoryTransactionPerThisWeek();



  }

  checkIsWeek(date: any) {
    var now = moment();
    return moment(date).isoWeek() == now.isoWeek();
  }


  async presentToast(text, type) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 1000,
        color: type
      });
    toast.present();
  }

  getTransactionPerId() {
    this.transactionService.getTransactions(this.userId).subscribe(res => {
      console.log(res);
      this.transactions = res;
    })
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
      this.transactionsNotificationForToday = res;
      console.log(this.transactionsNotificationForToday[0]);
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

  acceptTransaction(transaction) {
    transaction.accepted = true;
    this.transactionService.updateTrasaction(transaction.transactionId, transaction).subscribe( res => {
      console.log(res);
      if (!res) {
        transaction.accepted = false;
        this.presentToast("Fonduri insuficiente", "danger");
      } else {
        transaction.accepted = true;
      }
    })
  }

}

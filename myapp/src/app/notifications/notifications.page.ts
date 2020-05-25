import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../api/transaction.service';
import { CategoryTransaction } from '../_models/CategoryTransaction';
import { CategoryTransactionsService } from '../api/category-transactions.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Transaction } from '../_models/Transaction';

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
  

  constructor(private transactionService: TransactionService,
              private categoryTransactionService: CategoryTransactionsService) { }

  ngOnInit() {
    this.userId = this.getUserId();
    this.getTransactionPerId();
    this.getCategoryTransactionPerId();

  }


  getTransactionPerId() {
    this.transactionService.getTransactions(this.userId).subscribe( res => {
      console.log(res);
      this.transactions = res;
    });
  }

  getCategoryTransactionPerId() {
    this.categoryTransactionService.getCategoryTransactions(this.userId).subscribe( res => {
      console.log(res);
      this.categoryTransactions = res;
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

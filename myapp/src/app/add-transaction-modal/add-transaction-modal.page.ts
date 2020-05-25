import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-add-transaction-modal',
  templateUrl: './add-transaction-modal.page.html',
  styleUrls: ['./add-transaction-modal.page.scss'],
})
export class AddTransactionModalPage implements OnInit {

  constructor(private modalControl : ModalController,public navControl : NavController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalControl.dismiss({
      'dismissed': true
    })
  }

  goRequestMoney() {
    this.setNavigation('request', 'request');

  }

  goSendMoney() {
    this.setNavigation('send', 'request');
  }

  goAddtransaction() {
    this.setNavigation('income','add-transaction');
  }

  setNavigation(param:string, url:string)  //navigate with parameters
  {

    this.dismiss();
    let navigationExtras: NavigationExtras = {
      queryParams: {
          type: param
      }
    };
    
    this.navControl.navigateForward([url],navigationExtras);
  }
}

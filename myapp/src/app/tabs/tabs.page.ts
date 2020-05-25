import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { AddTransactionModalPage } from '../add-transaction-modal/add-transaction-modal.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  isActived: string = '';
  constructor(private modalControl: ModalController) { }

  ngOnInit() {
  }

  async openAddTransactionModal()
  {
    const modal = await this.modalControl.create({
      component: AddTransactionModalPage,
      backdropDismiss: true
    });


    return await modal.present();
  }

  clickTab(type: string) {
    this.isActived = type;
  }



}

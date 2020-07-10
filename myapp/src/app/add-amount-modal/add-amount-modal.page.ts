import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController, NavParams } from '@ionic/angular';
import { AdminService } from '../api/admin.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-amount-modal',
  templateUrl: './add-amount-modal.page.html',
  styleUrls: ['./add-amount-modal.page.scss'],
})
export class AddAmountModalPage implements OnInit {
  language: string;

 
  constructor(private modalControl : ModalController, 
              private navControl : NavController,
              private params: NavParams,
              private toastController: ToastController, 
              private adminService: AdminService) { }

  ngOnInit() {
    this.language = localStorage.getItem("limba");
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

 
 
  dismiss() {
    console.log('save form');
    this.modalControl.dismiss();
  }

}

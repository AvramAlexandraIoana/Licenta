import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.page.html',
  styleUrls: ['./success-modal.page.scss'],
})
export class SuccessModalPage implements OnInit {

  constructor(private modalControl: ModalController,private navControl: NavController) { }

  ngOnInit() {
    setTimeout(() => {
      this.dismiss();
      this.goHomePage();
    }, 2000);
  }

  dismiss()
  {
    this.modalControl.dismiss();
  }

  goHomePage()
  {
    this.navControl.navigateRoot('/tabs');
  }
}

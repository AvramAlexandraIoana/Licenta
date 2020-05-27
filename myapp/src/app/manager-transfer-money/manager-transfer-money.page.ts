import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../api/user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { User } from '../_models/User';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { AddAmountModalPage } from '../add-amount-modal/add-amount-modal.page';

@Component({
  selector: 'app-manager-transfer-money',
  templateUrl: './manager-transfer-money.page.html',
  styleUrls: ['./manager-transfer-money.page.scss'],
})
export class ManagerTransferMoneyPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  users: User[];

  constructor(private userService: UserService,
              private modalControl: ModalController,
              private toastController: ToastController) { }

  ngOnInit() {
    this.loadData1();
  }

  loadData1() {
    this.userService.getUserList().subscribe(res => {
      console.log(res);
      this.users = res;
    })

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

  addAmount(user, type) {
    console.log(user);
    console.log(type);
    var x, y, z;
    if (type == 'R') {
      user.sumaR += Number(user.sR);
      x = user.sR;
      
    } else if (type == 'E') {
      user.sumaE += Number(user.sE);
      y = user.sE;
    } else {
      user.sumaD += Number(user.sD);
      z = user.sD;
    }

    delete user.sR;
    delete user.sE;
    delete user.sD;

    this.userService.updateUser(user.id, user).subscribe(res => {
      console.log(res);
      this.presentToast("Amount added", "success");
      user.sR = x;
      user.sE = y;
      user.sD = z;
    });
   
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.users.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}

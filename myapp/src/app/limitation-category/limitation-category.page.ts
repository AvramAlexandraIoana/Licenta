import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../api/category.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Category } from '../_models/Category';
import { ModalController } from '@ionic/angular';
import { LimitationModalPage } from '../limitation-modal/limitation-modal.page';
import * as _ from 'lodash';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-limitation-category',
  templateUrl: './limitation-category.page.html',
  styleUrls: ['./limitation-category.page.scss'],
})
export class LimitationCategoryPage implements OnInit {
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  userId: number;
  categories: Category[];
  user: import("t:/Licenta/myapp/src/app/_models/User").User;


  constructor(private categoryService: CategoryService,
            private modalControl: ModalController,
            private userService: UserService) { }

  ngOnInit() {
    this.userId = this.getUserId();
    this.getUser();
    this.getCategories();
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe(res => {
      console.log(res);
      this.user = res;
    })
  }

  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
      this.decodedToken = this.jwtHelper.decodeToken(userToken);
      return Number(this.decodedToken.nameid);
    }
  }

  getCategories(){
    this.categoryService.getCategoryList().subscribe( res => {
      this.categories = res;
      var transaction: any = {};
      transaction.categoryName = "Tranzactii";
      transaction.categoryUrl = "pay-20s-40px.svg";
      this.categories.push(transaction);
      console.log(this.categories);

    });
  }

  async addLimit(item : any) {
    console.log("Ioana");
    item.unit = this.user.defaultCard;
    item.userId = this.userId;
    const modal = await this.modalControl.create({
      component: LimitationModalPage,
      componentProps: item,
      backdropDismiss: true
    });


    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log("data is  " + data);
  }

 
}

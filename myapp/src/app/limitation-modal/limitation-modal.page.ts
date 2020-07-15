import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { AdminService } from '../api/admin.service';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LimitationService } from '../api/limitation.service';
import { Limitation } from '../_models/Limitation';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-limitation-modal',
  templateUrl: './limitation-modal.page.html',
  styleUrls: ['./limitation-modal.page.scss'],
})
export class LimitationModalPage implements OnInit {
  limit: any;
  category: any;
  moned: string;
  limitationForm: FormGroup;
  errorMessages = {
    'limit':[
      { type:'required', message: 'Limita  este obligatorie'}
    ]
  }
  language: string;
  userId: number;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  user: any;
  units: any = [];
  
  constructor(private modalControl : ModalController, 
              public navControl : NavController,
              public params: NavParams,
              public adminService: AdminService,
              private formBuilder: FormBuilder,
              private limitationService: LimitationService,
              private userService: UserService) { }

  ngOnInit() {
    this.language = localStorage.getItem("limba");
    this.moned = "$";
    this.getUser();
    this.category  = this.params.data;
    this.createForm();
    this.userId = this.getUserId();

  }

  getUser() {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
      console.log(res);
      this.moned = this.user.defaultCard;
      if (this.user.areSumaD) {
          this.units.push({"val": '$', "name": 'USD'})
      }
      if (this.user.areSumaE) {
        this.units.push({"val": '€', "name": 'EURO'})
      }
      if (this.user.areSumaR) {
        this.units.push({"val": 'r', "name": 'RON'})
    }
    console.log(this.units);
    

    });
  }

  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

  createForm() {
    this.limitationForm = this.formBuilder.group({
      'limit': ['', [Validators.required]],
      'moneda': ['$', [Validators.required]],
    });
  }

  dismiss() {
    console.log('save form', this.limit);
    this.modalControl.dismiss(this.limit);
  }

  updateLimit() {
    if (this.limitationForm.invalid) {
      return;
    }
    var limitation = new Limitation();
    limitation.limit =  this.limitationForm.controls['limit'].value;
    limitation.unit =  this.limitationForm.controls['moneda'].value;
    limitation.categoryId =  this.category.categoryId;
    limitation.categoryName =  this.category.categoryName;
    limitation.userId =  this.category.userId;

    this.limitationService.saveLimit(limitation).subscribe(res => {
      console.log(res);
    })
    this.dismiss();

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

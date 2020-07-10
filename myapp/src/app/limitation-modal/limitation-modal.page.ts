import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { AdminService } from '../api/admin.service';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LimitationService } from '../api/limitation.service';
import { Limitation } from '../_models/Limitation';

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
  
  constructor(private modalControl : ModalController, 
              public navControl : NavController,
              public params: NavParams,
              public adminService: AdminService,
              private formBuilder: FormBuilder,
              private limitationService: LimitationService) { }

  ngOnInit() {
    this.language = localStorage.getItem("limba");
    this.moned = "$";
    this.category  = this.params.data;
    this.createForm();

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

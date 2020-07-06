import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SuccessModalPage } from '../success-modal/success-modal.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryTransactionsService } from '../api/category-transactions.service';
import { CategoryTransaction } from '../_models/CategoryTransaction';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CategoryService } from '../api/category.service';
import { Category } from '../_models/Category';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage implements OnInit {
  unit: string;


  categoryTransaction: FormGroup;
  jwtHelper = new JwtHelperService();
  errorMessages = {
    'suma':[
      { type:'required', message: 'Suma introdusa nu este valida'},
      { type:'min', message: 'Suma este prea mica'},
      { type:'max', message: 'Suma este prea mare '},
      { type:'pattern', message: 'Please enter valid Username format '}
    ],
    'unit': [
      { type: 'required', message: 'Unitatea este obligatorie'}
    ],
    'description': [
      { type: 'required', message: 'Descrierea este obligatorie'},
      { type: 'maxlength', message: 'Lungimea maxima este de 30 de caractere'},
      { type: 'minlength', message: 'Lungimea minima este de 5 de caractere'}
    ]
  }
  model: any;
  decodedToken: any;

  categoryIcons: Array<Category> = [];
  

  constructor(public toastController: ToastController,
              public categoryService: CategoryService,
              public categoryTransactionService: CategoryTransactionsService,
              public formBuilder: FormBuilder, public modalControl: ModalController, public navControl: NavController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.unit = '$';
    this.createCategoryTransaction();
    this.categoryService.getCategoryList().subscribe(res => {
      this.categoryIcons = res;
      console.log(this.categoryIcons);
    });

  }

  async showSuccessModal() {
    const modal = await this.modalControl.create({
      component: SuccessModalPage,
      backdropDismiss: true
    });

    return await modal.present();
  }

  createCategoryTransaction() {
    this.categoryTransaction = this.formBuilder.group({
      'suma': ['', [Validators.required,
                        Validators.min(5),
                        Validators.max(4000)]],
      'categoryId': ['', [Validators.required]],
      'unit': ['$', [Validators.required]],
      'description': ['', [Validators.required,
                          Validators.minLength(5),
                          Validators.maxLength(30)]],
      "transactionDate": [new Date().toISOString(), [Validators.required]]
    })
  }

  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

  async presentToast(text, type) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 500,
        color: type
      });
    toast.present();
  }

  sendCategoryTransaction() {
    if (this.categoryTransaction.invalid) {
      return;
    }

    this.model = new CategoryTransaction();
    this.model.Description = this.categoryTransaction.controls['description'].value;
    this.model.Value = Number(this.categoryTransaction.controls['suma'].value);
    this.model.categoryId = Number(this.categoryTransaction.controls["categoryId"].value);
    this.model.transactionDate = this.categoryTransaction.controls["transactionDate"].value;
    var categoryId = this.model.categoryId;
    this.model.categoryName = _.find(this.categoryIcons, function(object) {
      return object.categoryId == categoryId;
    }).categoryName;
    this.model.Unit = this.categoryTransaction.controls["unit"].value;
    this.model.UserId =  this.getUserId();
    console.log(this.model);
    this.categoryTransactionService.saveCategoryTransaction(this.model).subscribe(res => {
      console.log(res);
        if (!res) {
          this.presentToast("Nu ai fonduri suficiente", "danger");
        } else {
           this.showSuccessModal();
        }
      
    });
  }

}

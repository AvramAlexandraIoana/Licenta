import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController, ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { UserService } from '../api/user.service';
import { AccountService } from '../api/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AddNewCard } from '../_models/AddNewCard';

@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.page.html',
  styleUrls: ['./add-new-card.page.scss'],
})
export class AddNewCardPage implements OnInit {

  addNewCardForm: FormGroup;
  typeView: any;
  user = new User();
  imgUrl: string = 'credit card-20s-182px.svg';
  jwtHelper = new JwtHelperService();


  errorMessages = {
    'cardHolderName':[
      { type:'required', message: 'Numele titularului  este obligatoriu'},
      { type:'minlength', message: 'Lungimea numelui titularului trebuie sa aiba cel putin 10 caractere '},
      { type:'maxlength', message: 'Lungimea numelui titularului trebuie sa aiba cel mult 20 caractere'},
    ]
  }
  decodedToken: any;
  userId: number;
  language: string;
  
  constructor( private route: ActivatedRoute, 
              private formBuilder: FormBuilder,
              private navControl: NavController,
              private toastController: ToastController,
              private userService: UserService,
              private modalControl: ModalController,
              private accountService: AccountService) { }

  ngOnInit() {
    this.language = localStorage.getItem("limba");
    this.createNewCardForm();
    
  }

  
  async presentToast(text, type) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 1000,
        color: type
      });
    toast.present();
  }

  createNewCardForm() {
    this.addNewCardForm = this.formBuilder.group({
      'cardHolderName':['', [Validators.required,
                  Validators.minLength(10),
                  Validators.maxLength(30),
                 ]],
      'unit': ['RON', [Validators.required]]
    });
  }

  goToModifyProfile() {
    this.navControl.navigateRoot('modify-profile');
  }



  dismiss() {
    this.navControl.navigateBack("tabs/tab4");
    
   }

   getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

   addNewCard() {
     if (this.addNewCardForm.invalid) {
       return;
     }

     var model = new AddNewCard();
     model.CardHolderName = this.addNewCardForm.controls['cardHolderName'].value;
     model.ConversionMoney = this.addNewCardForm.controls['unit'].value;
     this.userId = this.getUserId();

     this.accountService.saveAccount(model, this.userId).subscribe( res => {
       console.log(res);
       this.presentToast("Card adaugat", "success");
       this.navControl.navigateBack("tabs/tab4");
     })
    
    
   }

 



  setNavigation(param: string, url: string)  //navigate with parameters
  {

    let navigationExtras: NavigationExtras = {
      queryParams: {
          type: param,
          special: JSON.stringify(this.user)
      }
    };
    
    this.navControl.navigateRoot([url],navigationExtras);
    //this.navControl.navigateBack("request");
  }

  getImageUrl() {
    if (this.addNewCardForm.valid) {
      this.imgUrl = "payment-20s-190px.svg";
    }
  }

}

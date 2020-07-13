import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, ToastController, ModalController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../api/user.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { TransactionService } from '../api/transaction.service';
import { SuccessModalPage } from '../success-modal/success-modal.page';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-iban-transfer',
  templateUrl: './iban-transfer.page.html',
  styleUrls: ['./iban-transfer.page.scss'],
})
export class IbanTransferPage implements OnInit {

  typeView: string;
  title: string;
  unit: string;
  peopleSelected: any[];
  sendMoneyForm: FormGroup;
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
    'beneficiar': [
      { type: 'required', message: 'Beneficiarul este obligatoriu'}
    ],
    'iban': [
      { type: 'required', message: 'Iban-ul este obligatoriu'}
    ],
    'description': [
      { type: 'required', message: 'Descrierea este obligatorie'},
      { type: 'maxlength', message: 'Lungimea maxima este de 30 de caractere'},
      { type: 'minlength', message: 'Lungimea minima este de 5 de caractere'}
    ]
  }

  isEnterSumInput: boolean;
  isEnterDescriptionInput: boolean;
  isEnterIban: boolean;
  isEnterName: boolean;
  content: any;
  IsKeyboardOpen: boolean=false;
  model: any;
  language: string;
  decodedToken: any;
  jwtHelper = new JwtHelperService();

  constructor(public ngZ: NgZone, 
    public navControl: NavController,
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    public  platform: Platform, 
    public keyboard: Keyboard,
    private transactionService: TransactionService,
    private toastController: ToastController,
    private modalControl: ModalController) {
     this.checkIfKeyboardIsOpen();
  }



  ngOnInit() {
    this.unit = '$';
    this.language = localStorage.getItem("limba");
    this.route.queryParams.subscribe(params => {
      this.typeView = params["type"];
      if (params && params.special) {
        this.peopleSelected = JSON.parse(params.special);
      }
    });
   
    this.createSendMoneyForm();
    this.setTitlePage();
  }

  checkIfKeyboardIsOpen() {
    var innerHeight = window.innerHeight;
    window.onresize = (e) =>
    {
        this.ngZ.run(() => 
        {
          if(window.innerHeight< innerHeight)
          {
            this.IsKeyboardOpen = true;
          }
          else
          {
            this.IsKeyboardOpen = false;
          }
        });
    };
  }
  
  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }


  createSendMoneyForm() {
    this.sendMoneyForm = this.formBuilder.group({
      'suma': ['', [Validators.required,
                        Validators.min(5),
                        Validators.max(5000)]],
      'unit': ['$', [Validators.required]],
      'iban': ['', [Validators.required]],
      'beneficiar': ['', [Validators.required]],
      'description': ['', [Validators.required,
                          Validators.minLength(5),
                          Validators.maxLength(30)]]
    })
  }
  setTitlePage() 
  {
    console.log(this.typeView);

    if (this.typeView == "request") {
      this.title = "Request Money From";
    } else if (this.typeView == "send") {
      this.title = "Send Money To";
    }
  }


  dismiss() {
    this.navControl.navigateForward("request");
   }

  async showSuccessModal() {
    const modal = await this.modalControl.create({
      component: SuccessModalPage,
      backdropDismiss: true
    });

    return await modal.present();
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

   sendMoneyWithIban() {
    if (this.sendMoneyForm.invalid) {
      return;
    }
    this.model = {};
    this.model.Description = this.sendMoneyForm.controls['description'].value;
    this.model.Value = Number(this.sendMoneyForm.controls['suma'].value);
    this.model.Unit = this.sendMoneyForm.controls["unit"].value;
    this.model.Iban = this.sendMoneyForm.controls["iban"].value;
    this.model.Name = this.sendMoneyForm.controls["beneficiar"].value;
    this.model.UserId =  this.getUserId();
    this.model.IsSend = true;
    this.transactionService.saveIbanTransaction(this.model).subscribe(res => {
      console.log(res);
        if (!res) {
          this.presentToast("Nu ai fonduri suficiente", "danger");
        } else {
           this.showSuccessModal();
        }
      
    });

    console.log(this.model);

   }
}

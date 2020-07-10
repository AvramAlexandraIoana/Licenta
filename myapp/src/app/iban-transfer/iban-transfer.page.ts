import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, ToastController, ModalController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../api/user.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';

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

  constructor(public ngZ: NgZone, public navControl: NavController, private route: ActivatedRoute, private formBuilder: FormBuilder, public  platform: Platform, public keyboard: Keyboard) {
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
}

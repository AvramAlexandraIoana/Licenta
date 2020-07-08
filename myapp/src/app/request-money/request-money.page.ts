import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import _ from 'lodash';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { timeout } from 'rxjs/operators';


@Component({
  selector: 'app-request-money',
  templateUrl: './request-money.page.html',
  styleUrls: ['./request-money.page.scss'],
})
export class RequestMoneyPage implements OnInit {
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

  goReviewRequestPage() {
    if (this.sendMoneyForm.invalid) {
      return;
    }
    this.model = {
      'suma': this.sendMoneyForm.controls['suma'].value,
      'unit': this.sendMoneyForm.controls['unit'].value,
      'description': this.sendMoneyForm.controls['description'].value
    }
    for (var i = 0; i < this.peopleSelected.length; i++) {
      this.peopleSelected[i].data = this.model;
    }
    this.setNavigation(this.typeView, "request-view");
  }

  deleteSelectedContact(contact: any) {
    var findIndex = _.findIndex(this.peopleSelected, function(object) {
      return object.displayName == contact.displayName;
    });
    if (findIndex != -1) {
      this.peopleSelected.splice(findIndex, findIndex+1);
    }

  }

  setNavigation(param:string, url:string)  //navigate with parameters
  {

    let navigationExtras: NavigationExtras = {
      queryParams: {
          type: param,
          special: JSON.stringify(this.peopleSelected),
          data: JSON.stringify(this.model)

      }
    };
    
    this.navControl.navigateForward([url],navigationExtras);
    //this.navControl.navigateBack("request");
  }



}

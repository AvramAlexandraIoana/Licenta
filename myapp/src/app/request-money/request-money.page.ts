import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import _ from 'lodash';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { timeout } from 'rxjs/operators';
import { UserService } from '../api/user.service';
import { User } from '../_models/User';
import { JwtHelperService } from '@auth0/angular-jwt';


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
  user: User;
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  userId: number;
  units: any = [];


  constructor(public ngZ: NgZone, 
              public navControl: NavController,
              private route: ActivatedRoute, 
              private formBuilder: FormBuilder, 
              public  platform: Platform, 
              public keyboard: Keyboard,
              private userService: UserService) {
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
    this.userId = this.getUserId();
    this.getUser();
  }

  
  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
      console.log(res);
      this.unit = this.user.defaultCard;
      if (this.user.areSumaD) {
          this.units.push({"val": '$', "name": 'USD'})
      }
      if (this.user.areSumaE) {
        this.units.push({"val": '€', "name": 'EURO'})
      }
      if (this.user.areSumaR) {
        this.units.push({"val": 'r', "name": 'RON'})
    }
    

    });
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

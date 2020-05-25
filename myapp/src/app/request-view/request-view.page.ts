import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessModalPage } from '../success-modal/success-modal.page';
import _ from 'lodash';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { TransactionService } from '../api/transaction.service';
import { Transaction } from '../_models/Transaction';
import { UserService } from '../api/user.service';
import { AuthService } from '../api/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.page.html',
  styleUrls: ['./request-view.page.scss'],
})
export class RequestViewPage implements OnInit {
  typeView: any;
  title: string;
  peopleSelected: any[];
  userName: string;
  IsKeyboardOpen: boolean;
  legatura: string;
  sendMoneyData: any;
  model: Transaction;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  limit: any;
  error: boolean;

  
  constructor(private transactionService: TransactionService,
            public ngZ: NgZone, 
            public modalControl: ModalController, 
            public navControl: NavController, 
            private route: ActivatedRoute, 
            public keyboard: Keyboard,   
            private router: Router,
            private userService: UserService,
            public alertController: AlertController      
           
    ) { 
    this.userName = "Ioana Avram";
    this.checkIfKeyboardIsOpen();
    this.limit = 5000;
    this.error = false;

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.typeView = params["type"];
      if (params && params.special) {
        this.peopleSelected = JSON.parse(params.special);
        if (this.peopleSelected) {
          if (this.peopleSelected.length > 1) {
          this.legatura  = "contacte vor primi bani:";
        } else {
          this.legatura = "contact va primi bani:";
        }
      } 
      if (params && params.data) {
        this.sendMoneyData = JSON.parse(params.data);
      }
    }
  });

    this.setTitlePage();
  }

  setTitlePage() 
  {
    console.log(this.typeView);

    if (this.typeView == "request") {
      this.title = "Review and Request";
    } else if (this.typeView == "send") {
      this.title = "Review and Send";
    }
  }

  deleteSelectedContact(contact: any) {
    var findIndex = _.findIndex(this.peopleSelected, function(object) {
      return object.displayName == contact.displayName;
    });
    if (findIndex != -1) {
      this.peopleSelected.splice(findIndex, findIndex+1);
    }

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
            console.log(this.IsKeyboardOpen);
            this.IsKeyboardOpen = false;
            if (this.error) {
              this.presentAlert();
            }
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
 
  addTransaction() {
    for (var i = 0; i < this.peopleSelected.length; i++) {
      this.model = new Transaction();
      this.model.Description = this.sendMoneyData.description;
      this.model.Value = Number(this.peopleSelected[i].data.suma);
      this.model.UserId =  this.getUserId();
      this.model.UserId1 = this.peopleSelected[i]._objectInstance.id;
      this.transactionService.saveTransaction(this.model).subscribe(res => {
        console.log("Tranzactie adaugata cu succes!");
      });

    }

  }

  calculateTotalSum() {
    var suma = _.sumBy(this.peopleSelected, function(object) {
      return Number(object.data.suma);
    });
    return suma;
  }

  async showSuccessModal() {
    this.addTransaction();
    const modal = await this.modalControl.create({
      component: SuccessModalPage,
      backdropDismiss: true
    });

    return await modal.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Limite zilnice depasite',
      message: 'Suma maxima care se poate trimite intr-o zi este de 4000 ' + this.sendMoneyData.unit + '.',
      buttons: ['Confirma']
    });

    await alert.present();
  }

  getValue(i: number) {
    var findElem = _.find(this.peopleSelected, function(object) {
      return object.data.suma > 4000;
    });
    if (findElem) {
      this.error = true;
    } else {
      this.error = false;
    }
    if (this.peopleSelected[i].data.suma > 4000) {
      this.peopleSelected[i].error = true;
    } else {
      this.peopleSelected[i].error = false;
    }
  }

  deleteContacts(i: number) {
    if (this.peopleSelected.length > 1) {
      this.peopleSelected.splice(i, i + 1);
    }
  }

}

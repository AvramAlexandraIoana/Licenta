import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { User } from '../_models/User';
import { Value } from '../_models/Value';
import { Contacts, ContactFieldType, IContactFindOptions }  from '@ionic-native/contacts';
import * as _ from 'lodash';
import { timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  peopleSelected: any[];
  typeView: any;
  title: string;
  users: Array<User>;
  categoryList:  Array<Value>;
  ourType: ContactFieldType[] = ["displayName"];
  contactsFound = [];
  inputValue: any;
  isKeyPress: boolean;
  options = [];
  selectOption: any;
  frecventContacts: Array<User>;
  contactsFoundAll: any[];
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  imageURL: any;

  constructor(public navControl: NavController, 
              private route: ActivatedRoute, 
              private userService: UserService,
              private contacts: Contacts,
              private router: Router,
              public http: HttpClient,
              private sanitizer: DomSanitizer) { 
    this.peopleSelected = [];
    this.options = ["Utilizate Frecvent", "Alfabetic"];
    this.selectOption = "Utilizate Frecvent";

    
   

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.typeView = params["type"];
    });
    this.setTitlePage();
    this.search('', 0);
  




  

   
    // //Get user
    // this.userService.getUser(7)
    //       .subscribe(res => {
    //         console.log("Get");
    //         console.log(res);
    //       })

    

    // this.userService.deleteUser(6)
    //       .subscribe(res => {
    //         console.log("Delete");
    //         console.log(res);
    //       });


  }

  getImage(userId: number): Observable<Blob> {
    return this.http.get('https://192.168.43.212:5001/api/users/getImageProfile/' + userId , {responseType: "blob"});
}
  //Verify if that contact phone number is saved in the database
  matchUsersWithContacts() {
      for (var i = 0;  i < this.contactsFound.length; i++) {
        var contact = this.contactsFound[i];
        var user = _.find(this.users, function(object) {
           return (object.phoneNumber ==  contact.phoneNumbers[0].value || object.phoneNumber == contact.phoneNumbers[0].value.substring(2));
        });
        if (user) {
          this.contactsFound[i].isSaved = true;
          this.contactsFound[i].id = user.id;
          this.contactsFound[i].imageURL = user.profilePictureName;
          this.contactsFound[i].userName = user.name;
          this.contactsFound[i].imageURL = user.profilePictureName;
          this.imageURL = user.profilePictureName;
        } else {
          this.contactsFound[i].isSaved = false;
          this.contactsFound[i].imageURL = null;
        }
        this.contactsFound[i].isFrecvent = false;
        this.contactsFound[i].isSelected = false;
      }
      console.log(this.contactsFound);

  }

  async getAllUsers() {
    this.userService.getUserList()
        .subscribe(res => {
          this.users = res;
          this.matchUsersWithContacts();
          this.getFrecventUser();
      
        });
  }

  async search(q, num: number) {
    const option: IContactFindOptions = {
      filter: q
    }
    this.contacts.find(this.ourType, option).then(contacts => {
      this.contactsFound = contacts;
      if (q == '' && !num) {
        this.getAllUsers();
      } else {
        for (var i=0 ; i < contacts.length; i++){
          if(contacts[i].displayName !== null) {
            var contact = _.find(this.contactsFoundAll, function(object) {
              return object.displayName == contacts[i].displayName;
            });
            if (contact) {
              this.contactsFound[i] = contact;
            }
           
          }
        }
      }
     
    });

   
  }

  onKeyUp(event) {
    this.search(event.target.value, 1);
  }

  setTitlePage() 
  {
    console.log(this.typeView);

    if (this.typeView == "request") {
      this.title = "Request Payments";
    } else if (this.typeView == "send") {
      this.title = "Send Money";
    }
  }

  goSendMoneyPage() {
    this.setNavigation(this.typeView, "request-money");
  }

  setNavigation(param: string, url: string)  //navigate with parameters
  {

    let navigationExtras: NavigationExtras = {
      queryParams: {
          type: param,
          special: JSON.stringify(this.peopleSelected)
      }
    };
    
    this.navControl.navigateForward([url],navigationExtras);
    //this.navControl.navigateBack("request");
  }

  addToSelectPeople(contact: any, num: number) {
    if (contact.isSelected) {
      this.deleteSelectedContact(contact);
    } else {
      var selectedIndex = _.findIndex(this.contactsFound, function(object) {
        return object.displayName == contact.displayName;
      });
  
       if (selectedIndex != -1) {
         this.contactsFound[selectedIndex].isSelected = true;
       }
      var findElem = _.find(this.peopleSelected, function(object) {
        return object.displayName == contact.displayName;
      });
      if (!findElem) {
        this.peopleSelected.push(contact);
      }
    }
   
  }

  deleteSelectedContact(contact: any) {
    var findIndex = _.findIndex(this.peopleSelected, function(object) {
      return object.displayName == contact.displayName;
    });
    if (findIndex != -1) {
      this.peopleSelected.splice(findIndex, findIndex+1);
    }

    var selectedIndex = _.findIndex(this.contactsFound, function(object) {
      return object.displayName == contact.displayName;
    });

     if (selectedIndex != -1) {
       this.contactsFound[selectedIndex].isSelected = false;
     }

  }


  changeInputValue() {
    this.inputValue = null;
    this.isKeyPress = false;
    this.search('', 1);
  }

  filterOption() {
    if (this.selectOption == "Alfabetic") {
      var sortedContacts = _.sortBy(this.contactsFound, function(object){
        return object.displayName;
      });
      this.contactsFound = sortedContacts;
    } else {

    }
  }
  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

  getFrecventUser() {
    var userId = this.getUserId();
    this.userService.getFrecventUserTransaction(userId).subscribe(res => {
      for (var i = 0;  i < res.length; i++) {
        var object = res[i];
        if (object.user[0]) {
          var userFoundIndex = _.findIndex(this.contactsFound, function(contact) {
            return (object.user[0] ==  contact.phoneNumbers[0].value || object.user[0] == contact.phoneNumbers[0].value.substring(2));
          });
          if (userFoundIndex != -1) {
            this.contactsFound[userFoundIndex].isFrecvent = true;
          } 
        }
       
      }
      console.log(this.contactsFound);
      this.contactsFoundAll = this.contactsFound;
    });
  }

  filterCond(list: any, num: number) {
    if (num == 1) {
      return _.filter(list, function(object) {
        return object.isFrecvent == true;
      });
    } else {
    
      return   _.filter(list, function(object) {
        return object.isFrecvent == false;
      });
    }
   

  }

  goToIbanPage() {
    this.navControl.navigateForward("iban-transfer");
  }

  

}

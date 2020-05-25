import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { User } from '../_models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RecentSearchService } from '../api/recent-search.service';
import { MessagesService } from '../api/messages.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-users-messages',
  templateUrl: './users-messages.page.html',
  styleUrls: ['./users-messages.page.scss'],
})
export class UsersMessagesPage implements OnInit {

  users: Array<User> = [];
  recentUsers: any;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  userId: number;
  inputValue: any;
  isKeyPress: boolean;
  userM: User;
  typeView: string;
  userR:  Array<User> = [];
  constructor(private usersService: UserService,
              private navControl: NavController,
              private recentSearchService: RecentSearchService,
              private messageService: MessagesService) { }

  ngOnInit() {
    this.isKeyPress = false;
    this.userId = this.getUserId();
    this.getUsers();
    this.getRecentSearches();
    
  }

  getRecentSearches() {
    // this.messageService.getRecentSearch(this.userId).subscribe(res => {
    //   for (var i = 0; i < res.length; i++)
    //       res[i].name = (res[i].name).split(" ")[0];
    //   this.recentUsers = res;
    //   console.log(res);
    //   console.log(res.length);
    // })
  }

  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

  getUsers() {
    this.usersService.getUserList().subscribe(res => {
      console.log(res);
      this.users = res;
      this.userR = res;
    });
  }

  

  goToMessageHistory(user: User) {
    console.log(user);
    var model = {
      UserId: this.userId,
      UserId1: user.id
    }

    this.recentSearchService.saveRecentSearch(model).subscribe(res => {
      console.log("Adaugata!");
    })

    this.userM = user;
    this.setNavigation(this.typeView, "chat");

  }


  setNavigation(param: string, url: string)  //navigate with parameters
  {

    let navigationExtras: NavigationExtras = {
    queryParams: {
        type: param,
        special: JSON.stringify(this.userM)
    }
    };

    this.navControl.navigateForward([url],navigationExtras);
    //this.navControl.navigateBack("request");
   }

   onKeyUp(event) {
    if (event == "") {
      this.users = this.userR;
      return;
    }
    console.log(event.target.value);
    var value = event.target.value;
    var users = _.filter(this.userR, function(object) {
      return object.name.toLowerCase().includes(value) || object.name.toUpperCase().includes(value);
    });
    this.users = users;
    console.log(users);
  }

  changeInputValue() {
    this.inputValue = null;
    this.isKeyPress = false;
    this.onKeyUp("");
  }


}

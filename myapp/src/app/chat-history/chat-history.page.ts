import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessagesService } from '../api/messages.service';
import { User } from '../_models/User';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.page.html',
  styleUrls: ['./chat-history.page.scss'],
})
export class ChatHistoryPage implements OnInit {
  isFirstLoad: boolean;
  imageURL: string;
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  userId: number;
  users: Array<User> = [];
  typeView: string;
  user: User;
  userM: User;

  constructor(private userService: UserService,
    private messageService: MessagesService,
    private navControl: NavController) { }

  ngOnInit() {

    
    this.userId = this.getUserId();
    this.getImageName(this.userId);
    this.getUsersListMessages();
  }

  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

  getUsersListMessages() {
    this.messageService.getUsersList(this.userId).subscribe(res => {
      console.log(res[0].user);
      this.users = res[0].user;
    });
  }

 

  getImageName(userId: number) {
    this.userService.getUser(userId).subscribe(response => {
      this.user = response;
      // this.profileImage.name = response.profilePictureName;
      this.imageURL = response.profilePictureName;
      this.isFirstLoad = true;
      console.log(response);
     
    })
  }

  goToMessageHistory(user: User) {
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

  keyPress() {
    this.navControl.navigateRoot(["users-messages"]);
  }

  dismiss() {
    this.navControl.navigateBack("tabs");
  }


}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  isFirstPressed: boolean;
  isSecondPressed: any;
  isThirdPressed: any;
  isFourPressed: any;
  userId: any;
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  user: import("t:/Licenta/myapp/src/app/_models/User").User;
  imageURL: string;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userId = this.getUserId();
    this.getImageName(this.userId);

  }

  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }

  }

  getImageName(userId: number) {
    this.userService.getUser(userId).subscribe(response => {
      this.user = response;
      // this.profileImage.name = response.profilePictureName;
      this.imageURL = response.profilePictureName;
      console.log(response);
     
    })
  }

  changeImage(num: number) {
    console.log("Ioana");
    if (num == 1) {
      if (this.isFirstPressed) {
        this.isFirstPressed = false;
      } else {
        this.isFirstPressed = true;
        this.isSecondPressed = false;
        this.isThirdPressed = false;
        this.isFourPressed = false;

      }
    } else if (num == 2) {
       if (this.isSecondPressed) {
         this.isSecondPressed = false;
       } else {
         this.isSecondPressed = true;
         this.isFirstPressed = false;
         this.isThirdPressed = false;
         this.isFourPressed = false;
 

       }
    } else if (num == 3) {
      if (this.isThirdPressed) {
        this.isThirdPressed = false;
      } else {
        this.isThirdPressed = true;
        this.isFirstPressed = false;
        this.isSecondPressed = false;
        this.isFourPressed = false;


      }
    } else {
      if (this.isFourPressed) {
        this.isFourPressed = false;
      } else {
        this.isFourPressed = true;
        this.isFirstPressed = false;
        this.isSecondPressed = false;
        this.isThirdPressed = false;

      }
    }
  }

  dismiss() {

  }
}

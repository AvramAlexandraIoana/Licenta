import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../_models/Review';
import { ReviewService } from '../api/review.service';

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
  reviewForm: FormGroup;

  errorMessages = {
    'emotion':[
      { type:'required', message: 'Emoticon is required'}
    ],
    'feedbackR':[
      { type:'required', message: 'Feedback is required'},
      { type:'minlength', message: 'Feedback lenght must be longer than or equal to 5 characters '},
      { type:'maxlength', message: 'Feedback lenght cannot exceed 120 characters '},
    ],
    'type':[
      { type:'required', message: 'Type is required'}
    ]
  }
  model: any;
  language: string;


  constructor(private userService: UserService,
              private navControl: NavController,
              private formBuilder: FormBuilder,
              private reviewService: ReviewService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.language = localStorage.getItem("limba");
    this.createReviewForm();
    this.userId = this.getUserId();
    this.getImageName(this.userId);


  }

  createReviewForm() {
    this.reviewForm = this.formBuilder.group({
      'feedbackR': ['', [Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(120)]],
      'type': ['', [Validators.required]]
    });

  }

  async presentToast(text, type) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000,
        color: type
      });
    toast.present();
  }

  sendReview() {
    var val;
    if (this.isFirstPressed) {
      val = "Disappointed";
    } else if (this.isSecondPressed) {
      val = "Poker Face";
    } else if (this.isThirdPressed) {
      val = "Smile Face";
    } else {
      val = "Love Face";
    }

    this.model = {
      'Emotion': val,
      'FeedbackR': this.reviewForm.controls['feedbackR'].value,
      'Type': this.reviewForm.controls['type'].value,
      'UserId': this.userId,
      'ImageUrl': this.user.profilePictureName,
      'Name': this.user.name
    }

    this.reviewService.saveReview(this.model).subscribe(res => {
      console.log("Review salvat");
      if (this.language == "romana") {
        this.presentToast("Feedback salvat", "success");
      } else {
        this.presentToast("Feedback saved", "success");
      }
      this.dismiss();
    });

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
    this.navControl.navigateBack(["tabs/tab1"]);
  }

  
}

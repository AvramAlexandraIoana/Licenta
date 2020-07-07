import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { User } from '../_models/User';
import { NavController, ModalController } from '@ionic/angular';
import { ModifyLocationInformationPage } from '../modify-location-information/modify-location-information.page';
import { ModifyFullNamePage } from '../modify-full-name/modify-full-name.page';
import { ModifyEmailPage } from '../modify-email/modify-email.page';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.page.html',
  styleUrls: ['./modify-profile.page.scss'],
})
export class ModifyProfilePage implements OnInit {
  typeView: any;
  user = new User();
  isPressed = {};
  isInit: boolean = false;
  language: string;

  constructor(private route: ActivatedRoute, 
              private navControl: NavController, 
              private modalControl: ModalController,
              private userService: UserService) { }


  ionViewWillEnter(){

    if (!this.isInit) {
      this.getUser();
    } else {
      this.isInit = false;
    }
    console.log("view");
  }

  ngOnInit() {
    this.isInit = true;
    console.log("init");
    this.language = localStorage.getItem("limba");
    this.isPressed['name'] = false;
    this.isPressed['address'] = false;
    this.isPressed['email'] = false;
    this.route.queryParams.subscribe(params => {
      this.typeView = params["type"];
      if (params && params.special) {
        this.user = JSON.parse(params.special);
        console.log(this.user);
      }
    });
  }

  getUser() {
    this.userService.getUser(this.user.id).subscribe(res => {
      console.log(res);
      this.user = res;
    })
  }

  async editDateProfile(type: string) {
    console.log(type);
    if (this.isPressed[type]) {
      this.isPressed[type] = false;
    } else {
      this.isPressed[type] = true;
    }

    if (type == "address") {
       // await this.openModifyLocationInformationModal();
        this.setNavigation(this.typeView, "modify-location-information");
    } else if (type == "name") {
        this.setNavigation(this.typeView, "modify-full-name");
        // await this.openFullNameModal();
    } else {
        this.setNavigation(this.typeView, "modify-email");
        //await this.openEmailModal();
    }

  }

 
  setNavigation(param: string, url: string)  //navigate with parameters
  {

    let navigationExtras: NavigationExtras = {
      queryParams: {
          type: param,
          special: JSON.stringify(this.user)
      }
    };
    
    this.navControl.navigateForward([url],navigationExtras);
    //this.navControl.navigateBack("request");
  }
  

}

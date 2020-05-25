import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from '../_models/User';
import { ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
  typeView: any;
  user: User;

  constructor(private navControl: NavController, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.typeView = params["type"];
      if (params && params.special) {
        this.user = JSON.parse(params.special);
        console.log(this.user);
      }
    });
  }

 

  goToModifyProfile() {
    this.setNavigation(this.typeView, "modify-profile");
  }

  goToHistoryImages() {
    this.navControl.navigateRoot(["image-history"]);
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

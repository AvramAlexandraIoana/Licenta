import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slideOpts={
    autoplay:true,
    loop:true
  }
  language: string;
  constructor(private navControl:NavController) { }

  ngOnInit() {
    this.language = localStorage.getItem("limba");
    if (!this.language) {
      localStorage["limba"] = "romana";
      this.language = "romana";
    }
  }

  goToLoginPage() {
    this.navControl.navigateRoot('tabs');
  }

  goToSignUpPage() {
    this.navControl.navigateRoot('login');

  }

}

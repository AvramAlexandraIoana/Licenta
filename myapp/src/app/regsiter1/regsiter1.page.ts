import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-regsiter1',
  templateUrl: './regsiter1.page.html',
  styleUrls: ['./regsiter1.page.scss'],
})
export class Regsiter1Page implements OnInit {

  username: string = "";
  password: string = "";
  cpassword: string = "";
  constructor(private afAuth: AngularFireAuth, public router: Router, public alertController: AlertController,

    ) { }

  ngOnInit() {
  }

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

  async register() {
    const { username, password, cpassword} = this;
    if (password !== cpassword) {
      return console.error("Passwords don't match");
    }
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(username + '@codedamn.com', password);
      console.log(res);
      this.presentAlert('Success', 'You are registered!')
      this.router.navigate(["/login1"]);
    } catch(error) {
      console.dir(error);

    }

  }

}

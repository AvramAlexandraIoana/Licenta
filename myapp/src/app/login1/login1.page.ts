import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.page.html',
  styleUrls: ['./login1.page.scss'],
})
export class Login1Page implements OnInit {

  username: string = "";
  password: string = "";
  constructor(public afAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
  }

  async login(){
    const {username, password} = this
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(username + '@codedamn.com', password)
      this.router.navigate(["/tabs"]);
    } catch(error) {
      console.dir(error);
      if (error.code == "auth/user-not-found") {
        console.log("User not found");
      }
    }
  }



}

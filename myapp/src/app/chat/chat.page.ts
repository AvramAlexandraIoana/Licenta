import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController, NavController } from '@ionic/angular';
import { MessagesService } from '../api/messages.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  message = '';
  messages = [];
  currentUser = '';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  cUser: string;
  typeView: any;
  otherUser: any;

 
  constructor(private socket: Socket, private toastCtrl: ToastController,
            private messageService: MessagesService,
            private route: ActivatedRoute,
            private navControl: NavController) { }
 
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.typeView = params["type"];
      if (params && params.special) {
        this.otherUser = JSON.parse(params.special);
        console.log(this.otherUser);
      }
    });
    this.socket.connect();
    this.getUserId();
    console.log(this.decodedToken);
    this.messageService.getMessageList(this.decodedToken.nameid, this.otherUser.id).subscribe(res => {
      console.log(res);
      this.messages = res;
    });
    
    let name = `${this.decodedToken.nameid}`;
    this.currentUser = `${this.decodedToken.nameid}`;
    this.cUser=  `${this.decodedToken.nameid}`;
    
    this.socket.emit('set-name', name);
 
    this.socket.fromEvent('users-changed').subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
 
    this.socket.fromEvent('message').subscribe((message: any)=> {
      // console.log(message);
      var mess = message.msg.split("-");
      console.log(mess);
      if (!message.userId3) {
        message.msg = mess[0];
        message.user = mess[1];
        message.userId3 = mess[2];
      }
   
      this.messages.push(message);
    });
  }

  verifyIfAppear(x, y, z) {
    console.log(x, y, z);
    if (z == x || z == y) {
      return true;
    }
    return false;
  }

  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
    }
  }
 
  sendMessage() {
    var model = {
      UserId1: Number(this.cUser),
      UserId2: Number(this.cUser) == this.otherUser.id ? this.decodedToken.nameid : this.otherUser.id,
      Messagge: this.message,
      CreatedAt: new Date()

    }
    console.log(this.cUser);
    console.log(this.otherUser.id);
    this.socket.emit('send-message', { text: this.message + '-' + this.cUser + '-' + this.otherUser.id }); 
    this.messageService.saveMessage(model).subscribe(res => {
      console.log(res);
     
    });
    this.message = '';
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  dismiss() {
    this.navControl.navigateBack("chat-history");
  
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import _ from 'lodash';
import { AdminService } from '../api/admin.service';

@Component({
  selector: 'app-user-role-modal',
  templateUrl: './user-role-modal.page.html',
  styleUrls: ['./user-role-modal.page.scss'],
})

export class UserRoleModalPage implements OnInit {
  availableRoles: any[] =  [
    {name: 'Admin', value: 'Admin'},
    {name: 'Store-Manager', value: 'Store-Manager'},
    {name: 'Member', value: 'Member'}
  ];
  roles: any[] = [];
  userRoles: { [key: string]: any; };
  language: string;
  constructor(private modalControl : ModalController, 
              public navControl : NavController,
              public params: NavParams,
              public adminService: AdminService) { }

  ngOnInit() {
    this.language = localStorage.getItem("limba");
    this.userRoles  = this.params.data.roles;
   
    this.verifiyRolesMatch();
    console.log(this.userRoles);  
  }

  verifiyRolesMatch() {
    this.roles = [];
    for (let i = 0;  i< this.availableRoles.length; i++) {
      var element = this.availableRoles[i];
      var findRoles = _.find(this.userRoles, function(object) {
        return object == element.name;
      });
      if (findRoles) {
        this.availableRoles[i].checked = true;
        this.roles.push(this.availableRoles[i]);
      } else {
        this.availableRoles[i].checked = false;
        this.roles.push(this.availableRoles[i]);
      }
    }

  }

  updateRoles() {
    var arrayRoles = [];
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].checked) {
         arrayRoles.push(this.roles[i].name);
      }
    }
    var objectRolesName = {
      "roleNames": arrayRoles
    };

    this.adminService.editUserRole(this.params.data.userName, objectRolesName).subscribe( res => {
      console.log(res);
      this.dismiss();
    });
  }

  dismiss() {
    this.modalControl.dismiss({
      'dismissed': true
    })
  }


 
  setNavigation(param:string, url:string)  //navigate with parameters
  {

    this.dismiss();
    let navigationExtras: NavigationExtras = {
      queryParams: {
          type: param
      }
    };
    
    this.navControl.navigateForward([url],navigationExtras);
  }

}

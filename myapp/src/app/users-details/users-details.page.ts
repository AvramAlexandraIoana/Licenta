import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AdminService } from '../api/admin.service';
import { UserAdmin } from '../_models/UserAdmin';
import { User } from '../_models/User';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UserRoleModalPage } from '../user-role-modal/user-role-modal.page';
import { Role } from '../_models/Role';
import _ from 'lodash';



@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.page.html',
  styleUrls: ['./users-details.page.scss'],
})
export class UsersDetailsPage implements OnInit {

    rows : any;
    isKeyPress: any;
    tableStyle = "bootstrap";
    customRowClass = false;
    selected: any[] = [];
    temp: UserAdmin[];
    @ViewChild(DatatableComponent) table: DatatableComponent;
    inputValue: any;
    language: string;
    //roles: Role[] = [];




  constructor(private alertControl: AlertController, private navControl: NavController, private adminService: AdminService, private modalControl: ModalController) { 
    this.adminService.getUsersWithRoles().subscribe(res => {
      this.rows = res;
      this.temp = res;
    });
  }

  ngOnInit() {
    this.language = localStorage.getItem("limba");
  }

  switchStyle() {
    if (this.tableStyle == "dark") {
      this.tableStyle = "bootstrap";
    } else {
      this.tableStyle = "dark";
    }

  }

  backButtons() {
    this.navControl.navigateBack("tabs/tab1");
  }

  getRowClass(row) {

  }

  async openEditRolesModal(row) {
    this.adminService.getRoles(row.id).subscribe(res => {
      row.roles = res;
      console.log(row.roles);
      this.open(row);
    });
   
  
  }

  async open(row) {
    const modal = await this.modalControl.create({
      component: UserRoleModalPage,
      componentProps: row,
      backdropDismiss: true
    });
  
    return await modal.present();
  }
  
  onSelect(event) {
    console.log('Event: select', event, this.selected);
  }

  onActivate(event) {
    console.log('Event: activate', event);
  }

  changeInputValue() {
    this.inputValue = null;
    this.rows = this.temp;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = _.filter(this.temp, function(object) {
        if (!object.phoneNumber) {
          return object.userName.toLowerCase().indexOf(val) != -1;
        } else  {
          return object.userName.toLowerCase().indexOf(val) != -1 ||  object.phoneNumber.indexOf(val) != -1;
        }
    });
    // this.temp.filter(function (d) {
    //   return d.userName.toLowerCase().indexOf(val) !== -1  ||   !val;
    // });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}

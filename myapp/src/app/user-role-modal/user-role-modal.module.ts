import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRoleModalPageRoutingModule } from './user-role-modal-routing.module';

import { UserRoleModalPage } from './user-role-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRoleModalPageRoutingModule
  ],
  declarations: [UserRoleModalPage]
})
export class UserRoleModalPageModule {}

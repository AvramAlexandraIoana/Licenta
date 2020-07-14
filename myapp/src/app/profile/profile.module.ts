import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { AppHasRoleDirective } from '../_directives/app-has-role.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, AppHasRoleDirective]
})
export class ProfilePageModule {}

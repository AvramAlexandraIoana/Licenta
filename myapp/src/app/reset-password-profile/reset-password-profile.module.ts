import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordProfilePageRoutingModule } from './reset-password-profile-routing.module';

import { ResetPasswordProfilePage } from './reset-password-profile.page';
import { ShowHideInputDirective } from '../_directives/show-hide-input.directive';
import { ShowHideInputCpDirective } from '../_directives/show-hide-inputcp.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ResetPasswordProfilePageRoutingModule
  ],
  declarations: [ResetPasswordProfilePage, ShowHideInputDirective, ShowHideInputCpDirective ]
})
export class ResetPasswordProfilePageModule {}

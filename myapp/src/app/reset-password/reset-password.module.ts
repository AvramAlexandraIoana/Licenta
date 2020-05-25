import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { ResetPasswordPage } from './reset-password.page';
import { ShowHideInputDirective } from '../_directives/show-hide-input.directive';
import { ShowHideInputCpDirective } from '../_directives/show-hide-inputcp.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ResetPasswordPageRoutingModule
  ],
  declarations: [ResetPasswordPage, ShowHideInputDirective, ShowHideInputCpDirective]
})
export class ResetPasswordPageModule {}

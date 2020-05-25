import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordConfirmationPageRoutingModule } from './forgot-password-confirmation-routing.module';

import { ForgotPasswordConfirmationPage } from './forgot-password-confirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordConfirmationPageRoutingModule
  ],
  declarations: [ForgotPasswordConfirmationPage]
})
export class ForgotPasswordConfirmationPageModule {}

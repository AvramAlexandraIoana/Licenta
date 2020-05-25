import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyEmailPageRoutingModule } from './modify-email-routing.module';

import { ModifyEmailPage } from './modify-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ModifyEmailPageRoutingModule
  ],
  declarations: [ModifyEmailPage]
})
export class ModifyEmailPageModule {}

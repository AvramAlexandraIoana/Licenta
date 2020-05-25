import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessModalPageRoutingModule } from './success-modal-routing.module';

import { SuccessModalPage } from './success-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessModalPageRoutingModule
  ],
  declarations: [SuccessModalPage]
})
export class SuccessModalPageModule {}

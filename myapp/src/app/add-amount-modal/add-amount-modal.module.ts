import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAmountModalPageRoutingModule } from './add-amount-modal-routing.module';

import { AddAmountModalPage } from './add-amount-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAmountModalPageRoutingModule
  ],
  declarations: [AddAmountModalPage]
})
export class AddAmountModalPageModule {}

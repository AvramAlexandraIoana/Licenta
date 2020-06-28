import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IbanTransferPageRoutingModule } from './iban-transfer-routing.module';

import { IbanTransferPage } from './iban-transfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IbanTransferPageRoutingModule
  ],
  declarations: [IbanTransferPage]
})
export class IbanTransferPageModule {}

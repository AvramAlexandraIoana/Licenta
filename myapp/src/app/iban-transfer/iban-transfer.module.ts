import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IbanTransferPageRoutingModule } from './iban-transfer-routing.module';

import { IbanTransferPage } from './iban-transfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IbanTransferPageRoutingModule
  ],
  declarations: [IbanTransferPage]
})
export class IbanTransferPageModule {}

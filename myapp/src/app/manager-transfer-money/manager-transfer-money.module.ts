import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerTransferMoneyPageRoutingModule } from './manager-transfer-money-routing.module';

import { ManagerTransferMoneyPage } from './manager-transfer-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerTransferMoneyPageRoutingModule
  ],
  declarations: [ManagerTransferMoneyPage]
})
export class ManagerTransferMoneyPageModule {}

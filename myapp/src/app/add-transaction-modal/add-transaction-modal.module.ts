import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTransactionModalPageRoutingModule } from './add-transaction-modal-routing.module';

import { AddTransactionModalPage } from './add-transaction-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTransactionModalPageRoutingModule
  ],
  declarations: [AddTransactionModalPage]
})
export class AddTransactionModalPageModule {}

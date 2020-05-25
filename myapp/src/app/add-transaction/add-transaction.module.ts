import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTransactionPageRoutingModule } from './add-transaction-routing.module';

import { AddTransactionPage } from './add-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddTransactionPageRoutingModule
  ],
  declarations: [AddTransactionPage]
})
export class AddTransactionPageModule {}

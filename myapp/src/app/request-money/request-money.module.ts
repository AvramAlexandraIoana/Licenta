import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestMoneyPageRoutingModule } from './request-money-routing.module';

import { RequestMoneyPage } from './request-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestMoneyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RequestMoneyPage]
})
export class RequestMoneyPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LimitationModalPageRoutingModule } from './limitation-modal-routing.module';

import { LimitationModalPage } from './limitation-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LimitationModalPageRoutingModule
  ],
  declarations: [LimitationModalPage]
})
export class LimitationModalPageModule {}

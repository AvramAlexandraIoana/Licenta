import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewCardPageRoutingModule } from './add-new-card-routing.module';

import { AddNewCardPage } from './add-new-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddNewCardPageRoutingModule
  ],
  declarations: [AddNewCardPage]
})
export class AddNewCardPageModule {}

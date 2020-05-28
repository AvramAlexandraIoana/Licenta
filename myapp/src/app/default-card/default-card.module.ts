import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefaultCardPageRoutingModule } from './default-card-routing.module';

import { DefaultCardPage } from './default-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DefaultCardPageRoutingModule
  ],
  declarations: [DefaultCardPage]
})
export class DefaultCardPageModule {}

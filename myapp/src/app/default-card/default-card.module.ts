import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefaultCardPageRoutingModule } from './default-card-routing.module';

import { DefaultCardPage } from './default-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefaultCardPageRoutingModule
  ],
  declarations: [DefaultCardPage]
})
export class DefaultCardPageModule {}

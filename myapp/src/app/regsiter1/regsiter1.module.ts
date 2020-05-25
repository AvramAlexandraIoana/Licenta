import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Regsiter1PageRoutingModule } from './regsiter1-routing.module';

import { Regsiter1Page } from './regsiter1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Regsiter1PageRoutingModule
  ],
  declarations: [Regsiter1Page]
})
export class Regsiter1PageModule {}

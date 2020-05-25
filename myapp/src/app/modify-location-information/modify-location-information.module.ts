import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyLocationInformationPageRoutingModule } from './modify-location-information-routing.module';

import { ModifyLocationInformationPage } from './modify-location-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ModifyLocationInformationPageRoutingModule
  ],
  declarations: [ModifyLocationInformationPage]
})
export class ModifyLocationInformationPageModule {}

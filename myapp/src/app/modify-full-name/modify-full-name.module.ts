import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyFullNamePageRoutingModule } from './modify-full-name-routing.module';

import { ModifyFullNamePage } from './modify-full-name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ModifyFullNamePageRoutingModule
  ],
  declarations: [ModifyFullNamePage]
})
export class ModifyFullNamePageModule {}

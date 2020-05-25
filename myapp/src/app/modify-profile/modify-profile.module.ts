import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyProfilePageRoutingModule } from './modify-profile-routing.module';

import { ModifyProfilePage } from './modify-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyProfilePageRoutingModule
  ],
  declarations: [ModifyProfilePage]
})
export class ModifyProfilePageModule {}

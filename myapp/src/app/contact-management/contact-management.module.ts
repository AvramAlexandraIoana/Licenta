import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactManagementPageRoutingModule } from './contact-management-routing.module';

import { ContactManagementPage } from './contact-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactManagementPageRoutingModule
  ],
  declarations: [ContactManagementPage]
})
export class ContactManagementPageModule {}

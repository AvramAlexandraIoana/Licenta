import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersMessagesPageRoutingModule } from './users-messages-routing.module';

import { UsersMessagesPage } from './users-messages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersMessagesPageRoutingModule
  ],
  declarations: [UsersMessagesPage]
})
export class UsersMessagesPageModule {}

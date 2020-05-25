import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatSPageRoutingModule } from './chat-s-routing.module';

import { ChatSPage } from './chat-s.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatSPageRoutingModule
  ],
  declarations: [ChatSPage]
})
export class ChatSPageModule {}

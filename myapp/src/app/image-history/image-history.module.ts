import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageHistoryPageRoutingModule } from './image-history-routing.module';

import { ImageHistoryPage } from './image-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageHistoryPageRoutingModule
  ],
  declarations: [ImageHistoryPage]
})
export class ImageHistoryPageModule {}

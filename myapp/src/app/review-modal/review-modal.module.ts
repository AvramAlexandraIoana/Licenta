import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewModalPageRoutingModule } from './review-modal-routing.module';

import { ReviewModalPage } from './review-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewModalPageRoutingModule
  ],
  declarations: [ReviewModalPage]
})
export class ReviewModalPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestViewPageRoutingModule } from './request-view-routing.module';

import { RequestViewPage } from './request-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestViewPageRoutingModule
  ],
  declarations: [RequestViewPage]
})
export class RequestViewPageModule {}

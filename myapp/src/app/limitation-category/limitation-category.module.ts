import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LimitationCategoryPageRoutingModule } from './limitation-category-routing.module';

import { LimitationCategoryPage } from './limitation-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LimitationCategoryPageRoutingModule
  ],
  declarations: [LimitationCategoryPage]
})
export class LimitationCategoryPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCategoryAdminPageRoutingModule } from './add-category-admin-routing.module';

import { AddCategoryAdminPage } from './add-category-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddCategoryAdminPageRoutingModule
  ],
  declarations: [AddCategoryAdminPage]
})
export class AddCategoryAdminPageModule {}

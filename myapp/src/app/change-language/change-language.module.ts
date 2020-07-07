import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeLanguagePageRoutingModule } from './change-language-routing.module';

import { ChangeLanguagePage } from './change-language.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChangeLanguagePageRoutingModule
  ],
  declarations: [ChangeLanguagePage]
})
export class ChangeLanguagePageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeLanguagePage } from './change-language.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeLanguagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeLanguagePageRoutingModule {}

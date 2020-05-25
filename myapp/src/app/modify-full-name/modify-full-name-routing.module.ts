import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyFullNamePage } from './modify-full-name.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyFullNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyFullNamePageRoutingModule {}

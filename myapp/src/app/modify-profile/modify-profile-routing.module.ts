import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyProfilePage } from './modify-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyProfilePageRoutingModule {}

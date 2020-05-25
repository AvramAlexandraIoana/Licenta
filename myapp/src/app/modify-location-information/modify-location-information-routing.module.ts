import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyLocationInformationPage } from './modify-location-information.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyLocationInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyLocationInformationPageRoutingModule {}

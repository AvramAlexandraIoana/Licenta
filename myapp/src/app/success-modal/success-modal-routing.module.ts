import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessModalPage } from './success-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessModalPageRoutingModule {}

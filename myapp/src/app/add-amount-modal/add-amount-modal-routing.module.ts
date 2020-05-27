import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAmountModalPage } from './add-amount-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddAmountModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAmountModalPageRoutingModule {}

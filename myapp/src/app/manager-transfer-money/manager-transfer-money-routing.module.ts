import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerTransferMoneyPage } from './manager-transfer-money.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerTransferMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerTransferMoneyPageRoutingModule {}

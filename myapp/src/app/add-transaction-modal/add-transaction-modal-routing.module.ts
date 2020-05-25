import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTransactionModalPage } from './add-transaction-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddTransactionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTransactionModalPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IbanTransferPage } from './iban-transfer.page';

const routes: Routes = [
  {
    path: '',
    component: IbanTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IbanTransferPageRoutingModule {}

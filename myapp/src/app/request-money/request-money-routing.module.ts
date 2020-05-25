import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestMoneyPage } from './request-money.page';

const routes: Routes = [
  {
    path: '',
    component: RequestMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestMoneyPageRoutingModule {}

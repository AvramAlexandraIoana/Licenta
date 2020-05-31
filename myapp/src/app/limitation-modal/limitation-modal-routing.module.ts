import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LimitationModalPage } from './limitation-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LimitationModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LimitationModalPageRoutingModule {}

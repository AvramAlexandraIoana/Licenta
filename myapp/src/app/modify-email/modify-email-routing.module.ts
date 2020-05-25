import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyEmailPage } from './modify-email.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyEmailPageRoutingModule {}

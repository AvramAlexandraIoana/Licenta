import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordProfilePage } from './reset-password-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordProfilePageRoutingModule {}

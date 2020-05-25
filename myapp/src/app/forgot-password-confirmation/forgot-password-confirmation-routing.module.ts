import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordConfirmationPage } from './forgot-password-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordConfirmationPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoogleLoginPage } from './google-login.page';

const routes: Routes = [
  {
    path: '',
    component: GoogleLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleLoginPageRoutingModule {}

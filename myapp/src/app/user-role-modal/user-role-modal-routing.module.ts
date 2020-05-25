import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRoleModalPage } from './user-role-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UserRoleModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoleModalPageRoutingModule {}

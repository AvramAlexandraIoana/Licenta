import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersDetailsPage } from './users-details.page';

const routes: Routes = [
  {
    path: '',
    component: UsersDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersDetailsPageRoutingModule {}

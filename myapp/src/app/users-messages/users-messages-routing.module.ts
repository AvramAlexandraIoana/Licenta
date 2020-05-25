import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersMessagesPage } from './users-messages.page';

const routes: Routes = [
  {
    path: '',
    component: UsersMessagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersMessagesPageRoutingModule {}

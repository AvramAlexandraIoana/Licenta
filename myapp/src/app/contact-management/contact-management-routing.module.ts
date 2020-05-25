import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactManagementPage } from './contact-management.page';

const routes: Routes = [
  {
    path: '',
    component: ContactManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactManagementPageRoutingModule {}

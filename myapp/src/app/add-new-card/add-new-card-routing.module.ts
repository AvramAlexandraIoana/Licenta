import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewCardPage } from './add-new-card.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewCardPageRoutingModule {}

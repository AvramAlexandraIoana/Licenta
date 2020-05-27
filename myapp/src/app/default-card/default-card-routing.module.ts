import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultCardPage } from './default-card.page';

const routes: Routes = [
  {
    path: '',
    component: DefaultCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultCardPageRoutingModule {}

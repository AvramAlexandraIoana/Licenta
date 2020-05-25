import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Regsiter1Page } from './regsiter1.page';

const routes: Routes = [
  {
    path: '',
    component: Regsiter1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Regsiter1PageRoutingModule {}

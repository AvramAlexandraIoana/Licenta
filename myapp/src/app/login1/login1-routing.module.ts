import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login1Page } from './login1.page';

const routes: Routes = [
  {
    path: '',
    component: Login1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Login1PageRoutingModule {}

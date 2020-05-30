import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LimitationCategoryPage } from './limitation-category.page';

const routes: Routes = [
  {
    path: '',
    component: LimitationCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LimitationCategoryPageRoutingModule {}

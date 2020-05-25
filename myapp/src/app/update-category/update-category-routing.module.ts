import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateCategoryPage } from './update-category.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateCategoryPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCategoryAdminPage } from './add-category-admin.page';

const routes: Routes = [
  {
    path: '',
    component: AddCategoryAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCategoryAdminPageRoutingModule {}

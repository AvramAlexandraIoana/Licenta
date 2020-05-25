import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageHistoryPage } from './image-history.page';

const routes: Routes = [
  {
    path: '',
    component: ImageHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageHistoryPageRoutingModule {}

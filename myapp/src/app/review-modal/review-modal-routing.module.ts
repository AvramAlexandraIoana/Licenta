import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewModalPage } from './review-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewModalPageRoutingModule {}

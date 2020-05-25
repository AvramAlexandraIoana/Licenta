import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatSPage } from './chat-s.page';

const routes: Routes = [
  {
    path: '',
    component: ChatSPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatSPageRoutingModule {}

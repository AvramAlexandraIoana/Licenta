import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../expenses/expenses.module').then(m => m.ExpensesPageModule)
          }
        ]
      },
      {
        path: 'tab3',
      
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',   loadChildren: ()  =>   import('../wallet/wallet.module').then(m => m.WalletPageModule)
            // import('../chat-history/chat-history.module').then( m => m.ChatHistoryPageModule)

            // import('../chat-s/chat-s.module').then( m => m.ChatSPageModule)

            // import('../chat/chat.module').then( m => m.ChatPageModule)
          

          }
        ]
      },
      {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
   {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

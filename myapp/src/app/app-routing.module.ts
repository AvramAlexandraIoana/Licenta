import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
  { 
    path: '', 
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule) 
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'expenses',
    loadChildren: () => import('./expenses/expenses.module').then( m => m.ExpensesPageModule)
  },
  {
    path: 'add-transaction',
    loadChildren: () => import('./add-transaction/add-transaction.module').then( m => m.AddTransactionPageModule)
  },
  {
    path: 'add-transaction-modal',
    loadChildren: () => import('./add-transaction-modal/add-transaction-modal.module').then( m => m.AddTransactionModalPageModule)
  },
  {
    path: 'success-modal',
    loadChildren: () => import('./success-modal/success-modal.module').then( m => m.SuccessModalPageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'request-money',
    loadChildren: () => import('./request-money/request-money.module').then( m => m.RequestMoneyPageModule)
  },
  {
    path: 'request-view',
    loadChildren: () => import('./request-view/request-view.module').then( m => m.RequestViewPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'forgot-password-confirmation',
    loadChildren: () => import('./forgot-password-confirmation/forgot-password-confirmation.module').then( m => m.ForgotPasswordConfirmationPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'users-details',
    loadChildren: () => import('./users-details/users-details.module').then( m => m.UsersDetailsPageModule)
  },
  {
    path: 'user-role-modal',
    loadChildren: () => import('./user-role-modal/user-role-modal.module').then( m => m.UserRoleModalPageModule)
  },
  {
    path: 'google-login',
    loadChildren: () => import('./google-login/google-login.module').then( m => m.GoogleLoginPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'upload-image',
    loadChildren: () => import('./upload-image/upload-image.module').then( m => m.UploadImagePageModule)
  },
  {
    path: 'login1',
    loadChildren: () => import('./login1/login1.module').then( m => m.Login1PageModule)
  },
  {
    path: 'regsiter1',
    loadChildren: () => import('./regsiter1/regsiter1.module').then( m => m.Regsiter1PageModule)
  },
  {
    path: 'uploader',
    loadChildren: () => import('./uploader/uploader.module').then( m => m.UploaderPageModule)
  },
  {
    path: 'feed',
    loadChildren: () => import('./feed/feed.module').then( m => m.FeedPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'modify-profile',
    loadChildren: () => import('./modify-profile/modify-profile.module').then( m => m.ModifyProfilePageModule)
  },
  {
    path: 'modify-location-information',
    loadChildren: () => import('./modify-location-information/modify-location-information.module').then( m => m.ModifyLocationInformationPageModule)
  },
  {
    path: 'modify-email',
    loadChildren: () => import('./modify-email/modify-email.module').then( m => m.ModifyEmailPageModule)
  },
  {
    path: 'modify-full-name',
    loadChildren: () => import('./modify-full-name/modify-full-name.module').then( m => m.ModifyFullNamePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'reset-password-profile',
    loadChildren: () => import('./reset-password-profile/reset-password-profile.module').then( m => m.ResetPasswordProfilePageModule)
  },
  {
    path: 'update-category',
    loadChildren: () => import('./update-category/update-category.module').then( m => m.UpdateCategoryPageModule)
  },
  {
    path: 'add-category-admin',
    loadChildren: () => import('./add-category-admin/add-category-admin.module').then( m => m.AddCategoryAdminPageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },
  {
    path: 'image-history',
    loadChildren: () => import('./image-history/image-history.module').then( m => m.ImageHistoryPageModule)
  },
  {
    path: 'contact-management',
    loadChildren: () => import('./contact-management/contact-management.module').then( m => m.ContactManagementPageModule)
  },
  {
    path: 'create-contact',
    loadChildren: () => import('./create-contact/create-contact.module').then( m => m.CreateContactPageModule)
  },
  {
    path: 'add-new-card',
    loadChildren: () => import('./add-new-card/add-new-card.module').then( m => m.AddNewCardPageModule)
  },
  {
    path: 'chat-history',
    loadChildren: () => import('./chat-history/chat-history.module').then( m => m.ChatHistoryPageModule)
  },
  {
    path: 'users-messages',
    loadChildren: () => import('./users-messages/users-messages.module').then( m => m.UsersMessagesPageModule)
  },
  {
    path: 'chat-s',
    loadChildren: () => import('./chat-s/chat-s.module').then( m => m.ChatSPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./review/review.module').then( m => m.ReviewPageModule)
  },
  {
    path: 'review-list',
    loadChildren: () => import('./review-list/review-list.module').then( m => m.ReviewListPageModule)
  },
  {
    path: 'review-modal',
    loadChildren: () => import('./review-modal/review-modal.module').then( m => m.ReviewModalPageModule)
  },
  {
    path: 'manager-transfer-money',
    loadChildren: () => import('./manager-transfer-money/manager-transfer-money.module').then( m => m.ManagerTransferMoneyPageModule)
  },
  {
    path: 'default-card',
    loadChildren: () => import('./default-card/default-card.module').then( m => m.DefaultCardPageModule)
  },
  {
    path: 'add-amount-modal',
    loadChildren: () => import('./add-amount-modal/add-amount-modal.module').then( m => m.AddAmountModalPageModule)
  },  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  }








];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

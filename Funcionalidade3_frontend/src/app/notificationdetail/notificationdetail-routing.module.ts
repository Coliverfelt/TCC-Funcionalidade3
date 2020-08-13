import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationdetailPage } from './notificationdetail.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationdetailPage
  },
  {
    path: ':notification',
    component: NotificationdetailPage
  },
  {
    path: ':newnotification',
    component: NotificationdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationdetailPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationdetailPageRoutingModule } from './notificationdetail-routing.module';

import { NotificationdetailPage } from './notificationdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NotificationdetailPageRoutingModule
  ],
  declarations: [NotificationdetailPage],
  providers: [FormBuilder]
})
export class NotificationdetailPageModule {}

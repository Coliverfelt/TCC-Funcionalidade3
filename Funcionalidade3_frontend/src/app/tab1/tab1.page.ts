import { Component, NgZone } from '@angular/core';
import { NotificationProviderService } from '../notification-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [
    NotificationProviderService
  ]
})
export class Tab1Page {
  public notificationsheader:string = "Notificações";
  public notifications:Array<Object> = [];

  constructor(public router: Router, 
    public notificationProvider: NotificationProviderService,
    private ngzone: NgZone) { }

  public ngOnInit(){
    console.log('ngOnInit')
  }

  public ionViewWillEnter(){
    console.log('ionViewWillEnter')
  }

  public ionViewDidEnter(){
    //console.log('ionViewDidEnter')
    this.ngzone.run(() => {
      this.notificationProvider.getNotifications().subscribe(
        data => {
          this.notifications = (data as any).notificacao;
          console.log(this.notifications)
        }, error => {
          console.log(error);
        }
      )
    })
  }
  public ionViewWillLeave(){
    console.log('ionViewWillLeave')
  }
  public ionViewDidLeave(){
    console.log('ionViewDidLeave')
  }
  public ngOnDestroy(){
    console.log('ngOnDestroy')
  }

  public plusClick(){
    return this.router.navigate(['notificationdetail'])
  }

  public itemClick(notification){
    //console.log(notification.idNotifications)
    this.router.navigate(['notificationdetail/', notification])
  }
}
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationProviderService } from '../notification-provider.service';
import { DatePipe } from '@angular/common';
import { Notificacoes } from 'src/contents/notificacoes.content';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CriaNotificacao } from 'src/contents/CriaNotificacao.content';

@Component({
  selector: 'app-notificationdetail',
  templateUrl: './notificationdetail.page.html',
  styleUrls: ['./notificationdetail.page.scss'],
  providers: [
    NotificationProviderService,
    DatePipe
  ]
})

export class NotificationdetailPage implements OnInit {
  public notify: any;
  public notificationdetailheader: string;
  public newnotification: string;
  public id: any;
  public titulo: any;
  public text: any;
  public turma: any;
  public datatime: any;
  public tdata: any;
  public fakedate: any;
  public turmas: Array<any> = [];
  submitted = false;
  model: Notificacoes;
  modelcria: CriaNotificacao;
  public ionicform: FormGroup;
  mydate;
  public agendada: any = 0;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public notificationProvider: NotificationProviderService,
    private ngZone: NgZone,
    public formbuild: FormBuilder,
    public datepipe: DatePipe
  ) { 
    this.mydate = new Date();
    this.mydate = this.datepipe.transform(this.mydate, 'yyyy-MM-dd HH:mm')

    this.ionicform = this.formbuild.group({
      titulo: ['', [Validators.required]],
      text: ['', [Validators.required]],
      date_time: ['', [Validators.required]],
      turma: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('idNotifications');
    this.ngZone.run(() => {
      this.notificationProvider.getNotification(this.id).subscribe(
        data => {
          this.notify = (data as any).notificacao;
          /*console.log(this.notify)
          console.log(this.id)*/
          if(this.id != null){
            this.notificationdetailheader = this.notify[0].titulo
            this.titulo = this.notify[0].titulo
            this.text = this.notify[0].text
            this.turma = this.notify[0].class
            this.datatime = this.notify[0].date_time

            this.fakedate = this.convertDate(this.datatime)
            this.agendada = this.status(this.fakedate)
            console.log(this.notify)
          }
          if(this.id == null){
            this.notificationdetailheader = "Nova Notificação";
            this.titulo = null
            this.text = null
            this.turma = null
            this.datatime = null
          }
          this.ionicform.setValue({
            titulo: this.titulo,
            text: this.text,
            date_time: this.datatime,
            turma: this.turma,
          })
        }, error => {
          console.log(error)
        }
      )
    })
  }

  status(fdate: any){
    if(fdate > this.mydate){
      this.agendada = 1
      console.log(fdate, this.mydate)
      console.log(this.agendada)
    }
    return this.agendada;
  }

  voltar(){
    this.router.navigate(['tabs/tab1'])
  }

  public convertDate(dt: any){
    this.tdata = new Date();
    this.tdata = dt
    this.tdata = this.datepipe.transform(this.tdata, 'yyyy-MM-dd HH:mm')
    dt = this.tdata;
    return dt
  }

  submitForm(){
      if (this.id == null) {
        this.modelcria = new CriaNotificacao(
          this.ionicform.value.turma,
          this.ionicform.value.text,
          this.ionicform.value.titulo,
          this.ionicform.value.date_time,
          this.ionicform.value.idUser
        )
        this.agendada = this.status(this.fakedate)
        this.modelcria.date_time = this.convertDate(this.ionicform.value.date_time)
        console.log(this.modelcria)
        this.notificationProvider.postNotification(this.modelcria).subscribe();
        return this.router.navigate(['tabs/tab1'])  
      } else {
        this.model = new Notificacoes(
          this.ionicform.value.turma,
          this.ionicform.value.text,
          this.ionicform.value.titulo,
          this.ionicform.value.date_time,
          this.ionicform.value.idUser,
          this.id
        )
        this.agendada = this.status(this.fakedate)
        this.model.date_time = this.convertDate(this.ionicform.value.date_time)
        console.log(this.model)
        this.notificationProvider.updateNotification(this.model).subscribe();
        return this.router.navigate(['tabs/tab1'])
      }
  }

  public deleteNotification(){
    console.log(this.id)
    this.notificationProvider.deleteNotification(this.id).subscribe();
    return this.router.navigate(['tabs/tab1'])
  }
}

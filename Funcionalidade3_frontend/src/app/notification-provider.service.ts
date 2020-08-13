import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notificacoes } from 'src/contents/notificacoes.content';
import { CriaNotificacao } from 'src/contents/CriaNotificacao.content';

@Injectable({
  providedIn: 'root'
})

export class NotificationProviderService {

  constructor(public http: HttpClient) { }

  private baseURL: string = "/api/"

  public postNotification(notificacao: CriaNotificacao){
    return this.http.post(this.baseURL + "createnotification/", notificacao);
  }

  public getNotifications(){
    return this.http.get(this.baseURL + "shownotifications/");
  }

  public getNotification(id: number){
    return this.http.get(this.baseURL + "shownotification/" + id);
  }

  public updateNotification(notificacaoupdate: Notificacoes){
    return this.http.put(this.baseURL + "updatenotification", notificacaoupdate);
  }

  public deleteNotification(id: number){
    return this.http.delete(this.baseURL + "deletenotification/" + id);
  }
}

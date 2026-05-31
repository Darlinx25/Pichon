import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class Websocket {
  private socket$: WebSocketSubject<any>;

  constructor() {
    //ip hardcodeada, luego configurar apache http como reverse proxy para el server WS
    //y usar el puerto estándar 80
    this.socket$ = webSocket('ws://localhost:8081');
  }

  sendMessage(message: any) {
    this.socket$.next(message);
  }

  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  closeConnection() {
    this.socket$.complete();
  }
}

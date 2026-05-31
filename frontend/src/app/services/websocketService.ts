import { Injectable,NgZone } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class Websocket {
  private socket$: WebSocketSubject<any>;
  private messagesSubject = new Subject<any>();

  constructor(private ngZone: NgZone) {
    //ip hardcodeada, luego configurar apache http como reverse proxy para el server WS
    //y usar el puerto estándar 80
    this.socket$ = webSocket(environment.wsUrl);;

    this.socket$.subscribe({
      next: (msg) => this.ngZone.run(() => this.messagesSubject.next(msg)),
      error: (err) => console.error('[WS] Error:', err),
    });
  }

  sendMessage(message: any) {
    this.socket$.next(message);
  }

  getMessages(): Observable<any> {
    return this.messagesSubject.asObservable();
  }

  closeConnection() {
    this.socket$.complete();
  }
}

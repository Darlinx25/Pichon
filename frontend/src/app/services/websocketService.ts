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
    this.socket$ = webSocket(environment.wsUrl);;

    this.socket$.subscribe({
      next: (msg) => this.ngZone.run(() => this.messagesSubject.next(msg)),
      error: (err) => console.error('[WS] Error:', err),
    });

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.id){
      this.socket$.next({ type: 'auth', userId: user.id });
    } 
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

  authenticate(userId: number) {
    this.socket$.next({ type: 'auth', userId });
  }

}

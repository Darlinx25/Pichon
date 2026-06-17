import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class Websocket {
  private socket$: WebSocketSubject<any> | null = null;
  private messagesSubject = new Subject<any>();
  private currentUserId: number | null = null;

  constructor(private ngZone: NgZone) {
    this.connect();
  }

  private connect() {
    this.socket$ = webSocket(environment.wsUrl);
    this.socket$.subscribe({
      next: (msg) => this.ngZone.run(() => this.messagesSubject.next(msg)),
      error: (err) => {
        console.error('[WS] Error:', err);
        this.reconnect();
      },
      complete: () => this.reconnect(),
    });
  }

   private reconnect() {
    setTimeout(() => {
      this.connect();
      if (this.currentUserId) {
        this.socket$?.next({ type: 'auth', userId: this.currentUserId });
      }
    }, 3000);
  }

  sendMessage(message: any) {
    this.socket$?.next(message);
  }
  getMessages(): Observable<any> {
    return this.messagesSubject.asObservable();
  }
  closeConnection() {
    this.socket$?.complete();
  }
  authenticate(userId: number) {                    
    this.socket$?.next({ type: 'auth', userId });
  }
}
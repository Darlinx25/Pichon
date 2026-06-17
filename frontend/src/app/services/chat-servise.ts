import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class ChatService {
  selectedUser$ = new Subject<any>();
  private unreadCounts = new Map<number, number>();
  unreadCounts$ = new BehaviorSubject<Map<number, number>>(new Map());
  refreshChats$ = new Subject<void>();
  switchToChats$ = new Subject<void>();
  refreshContactos$ = new Subject<void>(); 
  constructor(private http: HttpClient) { }
  selectUser(user: any) {
    this.selectedUser$.next(user);
  }
  incrementUnread(userId: number) {
    const id = Number(userId);
    const current = this.unreadCounts.get(id) || 0;
    this.unreadCounts.set(id, current + 1);
    this.unreadCounts$.next(new Map(this.unreadCounts));
  }
  clearUnread(userId: number) {
    const id = Number(userId);
    this.unreadCounts.delete(id);
    this.unreadCounts$.next(new Map(this.unreadCounts));
  }
  loadInitialUnreadCounts() {                       
    this.http.get<Record<string, number>>(
      `${environment.apiBaseUrl}/contarNoLeidos.php`
    ).subscribe(counts => {
      for (const [senderId, count] of Object.entries(counts)) {
        this.unreadCounts.set(Number(senderId), count);
      }
      this.unreadCounts$.next(new Map(this.unreadCounts));
    });
  }
  markAsRead(chatId: number) {                      
    this.http.post(`${environment.apiBaseUrl}/marcarLeidos.php`, {
      id_chat: chatId
    }).subscribe();
  }
}
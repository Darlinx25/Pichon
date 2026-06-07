import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ChatService {
  selectedUser$ = new Subject<any>();

  selectUser(user: any) {
    this.selectedUser$.next(user);
  }
}

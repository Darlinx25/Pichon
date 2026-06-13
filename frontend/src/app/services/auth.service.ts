import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private userSubject = new BehaviorSubject<any>(undefined);
  user$: Observable<any> = this.userSubject.asObservable();
  constructor() {
    this.checkSession().subscribe();
  }
  register(data: FormData) {
    return this.http.post<{ success?: boolean; message?: string; error?: string }>(
      `${environment.apiBaseUrl}/register.php`,
      data
    );
  }
  login(data: { username: string; password: string }) {
    return this.http.post<{ success?: boolean; user?: any; error?: string }>(
      `${environment.apiBaseUrl}/login.php`,
      data
    ).pipe(
      tap(res => {
        if (res.success && res.user) {
          this.userSubject.next(res.user);
        }
      })
    );
  }
  checkSession(): Observable<{ authenticated: boolean; user?: any }> {
    return this.http.get<{ authenticated: boolean; user?: any }>(
      `${environment.apiBaseUrl}/check-session.php`
    ).pipe(
      tap(res => {
        if (res.authenticated && res.user) {
          this.userSubject.next(res.user);
        }
      })
    );
  }
  logout() {
    return this.http.post<{ success: boolean }>(
      `${environment.apiBaseUrl}/logout.php`, {}
    ).pipe(
      tap(() => this.userSubject.next(null))
    );
  }
  setUser(user: any) {
    this.userSubject.next(user);
  }
  getCurrentUser(): any {
    return this.userSubject.getValue();
  }
}
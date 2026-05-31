import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  register(data: {
    username: string;
    email: string;
    alias: string;
    password: string;
    confirmPassword: string;
  }) {
    return this.http.post<{ success?: boolean; message?: string; error?: string }>(
      `http://${environment.apiBaseUrl}/register.php`,
      data
    );
  }
  login(data: { username: string; password: string }) {
    return this.http.post<{ success?: boolean; user?: any; error?: string }>(
      `http://${environment.apiBaseUrl}/register.php`,
      data
    );
  }
}
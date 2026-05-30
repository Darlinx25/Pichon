import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
      'http://127.0.0.1/Pichon/backend/register.php',
      data
    );
  }
}
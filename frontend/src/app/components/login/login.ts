import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit, OnDestroy {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  private authSub!: Subscription;
  errorMessage = '';
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(user => {
      if (user === undefined) return;
      if (user) this.router.navigate(['/chat']);
    });
  }
  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }
  onSubmit() {
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value as any).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.router.navigate(['/chat']);
        } else {
          this.errorMessage = res.error;
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error de conexión con el servidor';
      },
    });
  }
}
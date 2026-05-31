import { Component, inject, OnInit  } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit{
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  errorMessage = '';

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

   ngOnInit() {
    if(localStorage.getItem('user')){
      this.router.navigate(['/chat']);
    }
  }

  onSubmit() {
     if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value as any).subscribe({
      next: (res: any) => {
        if (res.success) {
          localStorage.setItem('user', JSON.stringify(res.user));
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

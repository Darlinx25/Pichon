import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);

  errorMessage = '';
  successMessage = '';

  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    alias: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(12)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(12)]]
  });

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get alias() {
    return this.registerForm.get('alias');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.authService.register(this.registerForm.value as any).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.successMessage = res.message;
          this.errorMessage = '';
          this.registerForm.reset();
        } else {
          this.errorMessage = res.error;
          this.successMessage = '';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error de conexión con el servidor';
        this.successMessage = '';
      },
    });
  }
}

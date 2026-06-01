import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  errorMessage = '';
  successMessage = '';
  selectedFile: File | null = null;

  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    alias: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(12)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(12)]],
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

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/chat']);
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    const formData = new FormData();
    formData.append('username', this.registerForm.get('username')?.value ?? '');
    formData.append('email', this.registerForm.get('email')?.value ?? '');
    formData.append('alias', this.registerForm.get('alias')?.value ?? '');
    formData.append('password', this.registerForm.get('password')?.value ?? '');
    formData.append('confirmPassword', this.registerForm.get('confirmPassword')?.value ?? '');
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }
    this.authService.register(formData).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.successMessage = res.message;
          this.errorMessage = '';
          this.registerForm.reset();
          this.selectedFile = null;
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}

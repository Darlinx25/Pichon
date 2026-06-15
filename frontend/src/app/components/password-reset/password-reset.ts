import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-password-reset',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.scss',
})
export class PasswordReset {
  mensaje = '';
  success = false;
  passwordResetForm: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.passwordResetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(12)]],
    });
  }

  onSubmit() {
    if (this.passwordResetForm.invalid) return;
    const token = this.route.snapshot.queryParamMap.get('token');
    const formData = new FormData();
    formData.append('token', token ?? '');
    formData.append('password', this.passwordResetForm.get('password')?.value ?? '');
    formData.append('confirmPassword', this.passwordResetForm.get('confirmPassword')?.value ?? '');
    this.http.post<{ success?: boolean; message?: string; error?: string }>(`${environment.apiBaseUrl}/passwordReset.php`, formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.mensaje = res.message!;
          this.success = true;
        } else {
          this.mensaje = res.error!;
          this.success = false;
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensaje = 'Error de conexión con el servidor';
        this.cdr.detectChanges();
      },
    });
    this.cdr.detectChanges();
  }
}

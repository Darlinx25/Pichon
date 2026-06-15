import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-recovery',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './recovery.html',
  styleUrl: './recovery.scss',
})
export class Recovery {
  mensaje = '';
  success = false;
  recoveryForm: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private cdr: ChangeDetectorRef) {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.recoveryForm.invalid) return;
    const formData = new FormData();
    formData.append('email', this.recoveryForm.get('email')?.value ?? '');
    this.http.post<{ success?: boolean; message?: string; error?: string }>(`${environment.apiBaseUrl}/recovery.php`, formData).subscribe({
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

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
  recoveryForm: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.recoveryForm.invalid) return;
    const formData = new FormData();
    formData.append('email', this.recoveryForm.get('email')?.value ?? '');
    this.http.post<any>(`${environment.apiBaseUrl}/recovery.php`, formData);
  }
}

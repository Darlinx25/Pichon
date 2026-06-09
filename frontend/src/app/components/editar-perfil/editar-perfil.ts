import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { environment } from '../../../environments/environment';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-editar-perfil',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.scss',
})
export class EditarPerfil implements OnInit {
  user: any;
  apiBaseUrl = environment.apiBaseUrl;
  perfilData: any = null;
  selectedFile: File | null = null;
  successMessage = '';
  errorMessage = '';
  loading = false;
  editForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.editForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      alias: ['', Validators.required],
      genero: [''],
      fecha_nacimiento: [''],
      idioma: [''],
      estado: [''],
    });
  }
  ngOnInit() {
    const userId = this.user?.id;
    if (userId) {
      this.userService.getPerfil(userId).subscribe(data => {
        this.perfilData = data;
        this.editForm.patchValue({
          username: data.username,
          email: data.email,
          alias: data.alias,
          genero: data.genero,
          fecha_nacimiento: data.fecha_nacimiento,
          idioma: data.idioma,
          estado: data.estado,
        });
        this.cdr.detectChanges();
      });
    }
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-avatar.jpg';
  }
  onSubmit() {
    if (this.editForm.invalid || this.loading) return;
    this.loading = true;
    const formData = new FormData();
    formData.append('id', this.user.id);
    formData.append('email', this.editForm.get('email')?.value ?? '');
    formData.append('alias', this.editForm.get('alias')?.value ?? '');
    formData.append('genero', this.editForm.get('genero')?.value ?? '');
    formData.append('fecha_nacimiento', this.editForm.get('fecha_nacimiento')?.value ?? '');
    formData.append('idioma', this.editForm.get('idioma')?.value ?? '');
    formData.append('estado', this.editForm.get('estado')?.value ?? '');
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }
    this.userService.actualizarPerfil(formData).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.success) {
          this.successMessage = res.message;
          this.errorMessage = '';
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          user.alias = this.editForm.get('alias')?.value;
          localStorage.setItem('user', JSON.stringify(user));
          this.cdr.detectChanges();
        } else {
          this.errorMessage = res.error;
          this.successMessage = '';
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.error || 'Error de conexión con el servidor';
        this.successMessage = '';
        this.cdr.detectChanges();
      },
    });
  }
}
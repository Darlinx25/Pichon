import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-editar-perfil',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.scss',
})
export class EditarPerfil implements OnInit {
  user: any;
  apiBaseUrl = environment.apiBaseUrl;
  perfilData: any = null;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isDragging = false;
  successMessage = '';
  errorMessage = '';
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

  private processFile(file: File) {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
    this.cdr.detectChanges();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) this.processFile(input.files[0]);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files[0]) this.processFile(event.dataTransfer.files[0]);
    this.cdr.detectChanges();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-avatar.jpg';
  }
  onSubmit() {
    if (this.editForm.invalid) return;
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
        if (res.success) {
          this.successMessage = res.message;
          this.errorMessage = '';
          this.userService.getPerfil(this.user.id).subscribe(data => {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            user.alias = data.alias;
            user.img = data.img;
            user.email = data.email;
            localStorage.setItem('user', JSON.stringify(user));
          });
        } else {
          this.errorMessage = res.error;
          this.successMessage = '';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error de conexión con el servidor';
        this.successMessage = '';
        this.cdr.detectChanges();
      },
    });
  }
}
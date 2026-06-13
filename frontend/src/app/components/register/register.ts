import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit, OnDestroy {
  errorMessage = '';
  successMessage = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isDragging = false;
  registerForm: any;
  private authSub!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      alias: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(12)]],
    });
  }
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
          this.imagePreview = null;
          this.cdr.detectChanges();
        } else {
          this.errorMessage = res.error;
          this.successMessage = '';
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error de conexión con el servidor';
        this.successMessage = '';
        this.cdr.detectChanges();
      },
    });
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
}
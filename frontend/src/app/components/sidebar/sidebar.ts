import { ChangeDetectorRef, Component, inject, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { ChatService } from '../../services/chat-servise';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-sidebar',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements AfterViewInit {
  router = inject(Router);
  user = JSON.parse(localStorage.getItem('user') || '{}');
  apiBaseUrl = environment.apiBaseUrl;

  private formBuilder = inject(FormBuilder);

  usuariosEncontrados: any[] = [];
  listaUsuarios: any[] = [];

  searchForm = this.formBuilder.group({
    busqueda: ['']
  });

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.searchForm.get('busqueda')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(texto => {
          if (!texto || texto.trim().length < 2) {
            return of([]);
          }
          return this.userService.buscarUsuarios(texto);
        })
      )
      .subscribe(usuarios => {
        this.usuariosEncontrados = usuarios;
        this.cdr.detectChanges();
      });

    this.userService.listarUsuarios().subscribe((usuarios) => {
      console.log('Respuesta:', usuarios);
      this.listaUsuarios = usuarios;
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    const tabEls = document.querySelectorAll('button[data-bs-toggle="tab"]');
    tabEls.forEach(el => new bootstrap.Tab(el));
  }

  cerrarSesion() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  seleccionarUsuario(usuario: any) {
    this.chatService.selectUser(usuario);
    this.usuariosEncontrados = [];
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-avatar.jpg';
  }
}
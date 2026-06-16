import { ChangeDetectorRef, Component, inject, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth.service';
import { debounceTime, distinctUntilChanged, of, Subscription, switchMap } from 'rxjs';
import { ChatService } from '../../services/chat-servise';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-sidebar',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnDestroy, AfterViewInit {
  router = inject(Router);
  authService = inject(AuthService);
  apiBaseUrl = environment.apiBaseUrl;
  user: any = null;
  private formBuilder = inject(FormBuilder);
  usuariosEncontrados: any[] = [];
  listaUsuarios: any[] = [];
  contactos: any[] = [];
  usuarioSeleccionado: any = null;
  searchForm = this.formBuilder.group({ busqueda: [''] });
  unreadCounts: Map<number, number> = new Map();
  @Input() lastMessages: Map<number, any> = new Map();
  private authSub!: Subscription;
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private chatService: ChatService
  ) { }
  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(user => {
      if (user === undefined) return;
      this.user = user;
      if (user) {
        this.userService.listarContactos().subscribe(contactos => {
          this.contactos = contactos;
          this.cdr.detectChanges();
        });
        this.chatService.loadInitialUnreadCounts();
      }
      this.cdr.detectChanges();
    });
    this.searchForm.get('busqueda')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(texto => {
          if (!texto || texto.trim().length < 2) return of([]);
          return this.userService.buscarUsuarios(texto);
        })
      )
      .subscribe(usuarios => {
        this.usuariosEncontrados = usuarios;
        this.cdr.detectChanges();
      });
    this.userService.listarUsuarios().subscribe(usuarios => {
      this.listaUsuarios = usuarios;
      this.cdr.detectChanges();
    });
    this.chatService.unreadCounts$.subscribe(counts => {
      this.unreadCounts = counts;
      this.cdr.detectChanges();
    });
  }
  ngAfterViewInit() {
    const tabEls = document.querySelectorAll('button[data-bs-toggle="tab"]');
    tabEls.forEach(el => new bootstrap.Tab(el));
  }
  cerrarSesion() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  seleccionarUsuario(usuario: any) {
    this.usuarioSeleccionado = usuario;
    this.chatService.selectUser(usuario);
    this.usuariosEncontrados = [];
  }
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-avatar.jpg';
  }
  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }
}
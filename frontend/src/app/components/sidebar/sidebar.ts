import { ChangeDetectorRef, Component, inject, OnDestroy, AfterViewInit, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat-servise';
import * as bootstrap from 'bootstrap';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit, OnDestroy, AfterViewInit {
  router = inject(Router);
  authService = inject(AuthService);
  apiBaseUrl = environment.apiBaseUrl;
  user: any = null;
  private formBuilder = inject(FormBuilder);
  chats: any[] = [];
  chatsFiltrados: any[] = [];
  contactos: any[] = [];
  contactosFiltrados: any[] = [];
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
    this.authService.user$.subscribe(user => {
      if (user === undefined) return;
      this.user = user;
      this.cdr.detectChanges();
    });
    this.userService.listarChats().subscribe((chats) => {
      this.chats = chats;
      this.chatsFiltrados = chats;
      this.cdr.detectChanges();
    });
    this.userService.listarContactos().subscribe((contactos) => {
      this.contactos = contactos;
      this.contactosFiltrados = contactos;
      this.cdr.detectChanges();
    });
    this.chatService.refreshChats$.subscribe(() => {
      this.userService.listarChats().subscribe(chats => {
        this.chats = chats;
        const texto = this.searchForm.get('busqueda')?.value;
        if (texto && texto.trim().length > 0) {
          const busqueda = texto.toLowerCase();
          this.chatsFiltrados = this.chats.filter(u =>
            u.alias?.toLowerCase().includes(busqueda)
          );
        } else {
          this.chatsFiltrados = chats;
        }
        this.cdr.detectChanges();
      });
    });
    this.chatService.refreshContactos$.subscribe(() => {
      this.userService.listarContactos().subscribe(contactos => {
        this.contactos = contactos;
        const texto = this.searchForm.get('busqueda')?.value;
        if (texto && texto.trim().length > 0) {
          const busqueda = texto.toLowerCase();
          this.contactosFiltrados = this.contactos.filter(c =>
            c.alias?.toLowerCase().includes(busqueda)
          );
        } else {
          this.contactosFiltrados = contactos;
        }
        this.cdr.detectChanges();
      });
    });
    this.chatService.unreadCounts$.subscribe(counts => {
      this.unreadCounts = counts;
      this.cdr.detectChanges();
    });
    this.chatService.switchToChats$.subscribe(() => {
      const tab = document.querySelector('#chat-tab');
      if (tab) new bootstrap.Tab(tab).show();
    });
    this.searchForm.get('busqueda')?.valueChanges.subscribe(texto => {
      if (!texto || texto.trim().length === 0) {
        this.chatsFiltrados = this.chats;
        this.contactosFiltrados = this.contactos;
      } else {
        const busqueda = texto.toLowerCase();
        this.chatsFiltrados = this.chats.filter(u =>
          u.alias?.toLowerCase().includes(busqueda)
        );
        this.contactosFiltrados = this.contactos.filter(c =>
          c.alias?.toLowerCase().includes(busqueda)
        );
      }
      this.cdr.detectChanges();
    });
    this.chatService.loadInitialUnreadCounts();
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
  }
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-avatar.jpg';
  }
  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }
}
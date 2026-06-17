import { Component, inject, OnDestroy, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar'
import { Subscription } from 'rxjs';
import { Websocket } from '../../services/websocketService';
import { AudioService } from '../../services/audio-service';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../../services/chat-servise';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-message-window',
  imports: [ReactiveFormsModule, RouterLink, CommonModule, Sidebar],
  templateUrl: './message-window.html',
  styleUrl: './message-window.scss',
})
export class MessageWindow implements OnInit, OnDestroy {
  @ViewChild('mensajeInput') mensajeInput!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  messages: any[] = [];
  lastMessages: Map<number, any> = new Map();
  selectedUser: any = null;
  chatId: number | null = null;
  user: any = null;
  apiBaseUrl = environment.apiBaseUrl;
  constructor(
    private webSocketService: Websocket,
    private cdr: ChangeDetectorRef,
    private chatService: ChatService,
    private http: HttpClient,
    private audioService: AudioService,
    private authService: AuthService,
    private sanitizer: DomSanitizer) { }
  private authSub!: Subscription;
  private userSub!: Subscription;
  private messageSub!: Subscription;

  urlify(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
    );
  }

  formBuilder = inject(FormBuilder);
  router = inject(Router);
  chatForm = this.formBuilder.group({ mensaje: ['', Validators.required] });
  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(user => {
      if (user === undefined) return;
      this.user = user;
      if (!user) { this.router.navigate(['/']); return; }
      this.webSocketService.authenticate(user.id);

      this.http.get<any[]>(`${this.apiBaseUrl}/ultimosMensajes.php`)
        .subscribe(lista => {
          for (const c of lista) {
            this.lastMessages.set(c.id, c);
          }
          this.cdr.detectChanges();
        });
    });
    this.userSub = this.chatService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
      this.cargarChat(user.id);
      this.mensajeInput?.nativeElement.focus();
      this.cdr.detectChanges();
    });
    this.messageSub = this.webSocketService.getMessages().subscribe(msg => {
      if (!this.user) return;
      if (Number(msg.id_chat) !== this.chatId) {
        this.lastMessages.set(Number(msg.id_usuario), {
          id: Number(msg.id_usuario),
          ultimo_contenido: msg.contenido,
          ultima_fecha: msg.fecha,
          id_usuario_ultimo: Number(msg.id_usuario),
          ultimo_tipo: msg.tipo || 'text'
        });
        this.chatService.refreshChats$.next();
        if (msg.id_usuario !== this.user.id) {
          this.chatService.incrementUnread(msg.id_usuario);
        }
        return;
      }
      this.chatService.markAsRead(this.chatId!);
      this.messages.push({
        data: msg.contenido,
        fecha: msg.fecha,
        fromId: msg.id_usuario,
        side: msg.id_usuario === this.user.id ? 'outgoing' : 'incoming',
        tipo: msg.tipo || 'text',
        archivo: msg.archivo || null
      });
      const otroId = msg.id_usuario === this.user.id ? this.selectedUser.id : msg.id_usuario;
      this.lastMessages.set(Number(otroId), {
        id: Number(otroId),
        ultimo_contenido: msg.contenido,
        ultima_fecha: msg.fecha,
        id_usuario_ultimo: Number(msg.id_usuario),
        ultimo_tipo: msg.tipo || 'text'
      });
      this.chatService.refreshChats$.next();
      this.cdr.detectChanges();
      if (msg.id_usuario !== this.user.id) {
        this.audioService.playNotificacion();
      }
    });
  }
  cargarChat(idUsuario: number): void {
    this.http.get<any>(`${this.apiBaseUrl}/obtenerChat.php`, {
      params: { id_contacto: idUsuario }
    }).subscribe(response => {
      this.chatId = response.id_chat;
      if (this.chatId !== null) {
        this.chatService.markAsRead(this.chatId);
      }
      this.chatService.clearUnread(idUsuario);
      const mensajes = response.messages ?? [];
      this.messages = mensajes.map((mensaje: any) => {
        const esMio = mensaje.id_usuario === Number(this.user?.id);
        return {
          data: mensaje.contenido,
          fecha: mensaje.fecha,
          fromId: mensaje.id_usuario,
          side: esMio ? 'outgoing' : 'incoming',
          tipo: mensaje.tipo || 'text',
          archivo: mensaje.archivo || null
        };
      });
      if (mensajes.length > 0) {
        const ultimo = mensajes[mensajes.length - 1];
        this.lastMessages.set(idUsuario, {
          id: idUsuario,
          ultimo_contenido: ultimo.contenido,
          ultima_fecha: ultimo.fecha,
          id_usuario_ultimo: ultimo.id_usuario,
          ultimo_tipo: ultimo.tipo || 'text'
        });
      }
      this.cdr.detectChanges();
    });
  }
  enviarMensaje() {
    if (this.chatForm.invalid || !this.selectedUser || !this.chatId) return;
    const msg = {
      type: 'message',
      from: this.user?.alias,
      fromId: this.user?.id,
      to: this.selectedUser.id,
      chatId: this.chatId,
      data: this.chatForm.value.mensaje
    };
    this.webSocketService.sendMessage(msg);
    this.lastMessages.set(this.selectedUser.id, {
      id: this.selectedUser.id,
      ultimo_contenido: this.chatForm.value.mensaje,
      ultima_fecha: new Date().toISOString(),
      id_usuario_ultimo: this.user.id
    });
    this.chatService.refreshChats$.next();
    this.chatForm.reset();
    this.chatService.switchToChats$.next();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.subirArchivo(input.files[0]);
      input.value = '';
    }
  }

  subirArchivo(file: File) {
    if (!this.selectedUser || !this.chatId) return;
    const formData = new FormData();
    formData.append('archivo', file, file.name);
    formData.append('id_chat', this.chatId.toString());
    formData.append('id_destinatario', this.selectedUser.id.toString());

    this.http.post<any>(`${this.apiBaseUrl}/subirArchivo.php`, formData).subscribe({
      next: (res) => {
        if (res.error) return;
        this.messages.push({
          data: res.contenido,
          fecha: res.fecha,
          fromId: res.id_usuario,
          side: 'outgoing',
          tipo: res.tipo,
          archivo: res.archivo
        });
        this.lastMessages.set(this.selectedUser.id, {
          id: this.selectedUser.id,
          ultimo_contenido: res.contenido,
          ultima_fecha: res.fecha,
          id_usuario_ultimo: this.user.id,
          ultimo_tipo: res.tipo
        });
        this.chatService.refreshChats$.next();
        this.cdr.detectChanges();
        this.webSocketService.sendMessage({
          type: 'file_notification',
          from: this.user?.alias,
          fromId: this.user?.id,
          to: this.selectedUser.id,
          chatId: this.chatId,
          id_mensaje: res.id_mensaje,
          contenido: res.contenido,
          fecha: res.fecha,
          tipo: res.tipo,
          archivo: res.archivo
        });
      },
      error: (err) => {
        console.error('Error al subir archivo:', err);
      }
    });
  }

  abrirImagen(url: string) {
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.messageSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }
  manejadorTeclaEnter(event: Event) {
    const keyboardEvt = event as KeyboardEvent;
    if (!keyboardEvt.shiftKey) {
      keyboardEvt.preventDefault();
      this.enviarMensaje();
    }
  }
  @ViewChild('msgContainer') private msgContainer!: ElementRef;
  scrollearAbajo(): void {
    const element = this.msgContainer.nativeElement;
    element.scrollTop = element.scrollHeight;
  }
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-avatar.jpg';
  }
}
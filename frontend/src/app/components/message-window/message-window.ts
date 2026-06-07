import { Component, inject, OnDestroy, OnInit, ChangeDetectorRef, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar'
import { Subscription } from 'rxjs';
import { Websocket } from '../../services/websocketService';
import { AudioService } from '../../services/audio-service';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../../services/chat-servise';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-message-window',
  imports: [ReactiveFormsModule, RouterLink, Sidebar],
  templateUrl: './message-window.html',
  styleUrl: './message-window.scss',
})

export class MessageWindow implements OnInit, OnDestroy {
  messages: any[] = [];
  selectedUser: any = null;
  chatId: number | null = null;
  user = JSON.parse(localStorage.getItem('user') || '{}');
  apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private webSocketService: Websocket,
    private cdr: ChangeDetectorRef,
    private chatService: ChatService,
    private http: HttpClient,
    private audioService: AudioService) { }
    private userSub!: Subscription;
    private messageSub!: Subscription;

  formBuilder = inject(FormBuilder);
  router = inject(Router);

  chatForm = this.formBuilder.group({
    mensaje: ['', Validators.required]
  });

  ngOnInit() {
    if (!this.user.id) { this.router.navigate(['/']); return; }
    this.userSub = this.chatService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
      this.cargarChat(user.id);
    });
    this.messageSub = this.webSocketService.getMessages().subscribe(msg => {
      if (msg.type !== 'message' || msg.chatId !== this.chatId || msg.fromId === this.user.id) return;
      this.messages.push({ ...msg, side: 'incoming' });
      this.cdr.detectChanges();
      this.audioService.playNotificacion();
    });
  }

  cargarChat(idUsuario: number): void {
    this.http.get<any>(`${this.apiBaseUrl}/obtenerChat.php`, {
      params: {
        id_usuario1: this.user.id,
        id_usuario2: idUsuario
      }
    }).subscribe(response => {
      this.chatId = response.id_chat;
      const mensajes = response.messages ?? [];
      this.messages = mensajes.map((mensaje: any) => {
        const esMio = mensaje.id_usuario === Number(this.user.id);

        return {
          data: mensaje.contenido,
          fromId: mensaje.id_usuario,
          side: esMio ? 'outgoing' : 'incoming'
        };
      });

      this.cdr.detectChanges();
    });
  }

  enviarMensaje() {
    if (this.chatForm.invalid || !this.selectedUser || !this.chatId) return;
    const msg = {
      type: 'message',
      from: this.user.alias,
      fromId: this.user.id,
      to: this.selectedUser.id,
      chatId: this.chatId,
      data: this.chatForm.value.mensaje
    };
    this.webSocketService.sendMessage(msg);
    this.messages.push({ ...msg, side: 'outgoing' });
    this.chatForm.reset();
  }


  ngOnDestroy(): void {
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

  @ViewChild('msgContainer')
  private msgContainer!: ElementRef;

  scrollearAbajo(): void {
    const element = this.msgContainer.nativeElement;
    element.scrollTop = element.scrollHeight;
  }
}

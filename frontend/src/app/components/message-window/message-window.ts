import { Component, inject, OnDestroy, OnInit, ChangeDetectorRef, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar'
import { Subscription } from 'rxjs';
import { Websocket } from '../../services/websocketService';

@Component({
  selector: 'app-message-window',
  imports: [ReactiveFormsModule, RouterLink, Sidebar],
  templateUrl: './message-window.html',
  styleUrl: './message-window.scss',
})


export class MessageWindow implements OnInit, OnDestroy {
  messages: any[] = [];
  private messageSubscription!: Subscription;
  private sonidoNotificacion = new Audio('assets/notification.mp3');

  constructor(private webSocketService: Websocket, private cdr: ChangeDetectorRef) { }

  formBuilder = inject(FormBuilder);
  router = inject(Router);

  chatForm = this.formBuilder.group({
    mensaje: ['', Validators.required]
  });

  ngOnInit() {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }

    this.messageSubscription = this.webSocketService.getMessages().subscribe(
      (message) => {
        this.messages.push({ ...message, side: 'incoming' });
        //Se usa incoming u outgoing como abajo en enviar mensaje para definir de que lado se muestra el mensaje
        this.cdr.detectChanges();
        this.playNotificacion();
      }
    );

  }

  enviarMensaje() {
    if (this.chatForm.invalid) return;
    const msgText = this.chatForm.value.mensaje;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const message = {
      type: 'message',
      from: user.alias || 'desconocido',
      data: msgText
    };
    this.webSocketService.sendMessage(message);
    this.messages.push({ ...message, side: 'outgoing' });
    this.chatForm.reset();
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
    this.webSocketService.closeConnection();
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

  playNotificacion(): void {
    this.sonidoNotificacion.load();
    this.sonidoNotificacion.play().catch(err => console.error('Erorr al reproducir audio:', err));
  }
}

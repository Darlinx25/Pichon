import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-message-window',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './message-window.html',
  styleUrl: './message-window.scss',
})
export class MessageWindow {
  formBuilder = inject(FormBuilder);

  chatForm = this.formBuilder.group({
    mensaje: ['', Validators.required]
  });

  enviarMensaje() {
    
  }
}

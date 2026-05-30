import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar'
 
@Component({
  selector: 'app-message-window',
  imports: [ReactiveFormsModule, RouterLink, Sidebar],
  templateUrl: './message-window.html',
  styleUrl: './message-window.scss',
})
export class MessageWindow implements OnInit {
  formBuilder = inject(FormBuilder);
  router = inject(Router); 

  chatForm = this.formBuilder.group({
    mensaje: ['', Validators.required]
  });

  ngOnInit() {
    if(!localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }

  enviarMensaje() {
    
  }
}

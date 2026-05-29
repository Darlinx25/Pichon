import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Sidebar } from './components/sidebar/sidebar';
import { MessageWindow } from './components/message-window/message-window';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, Register, Sidebar, MessageWindow, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}

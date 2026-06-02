import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  router = inject(Router);  
  user = JSON.parse(localStorage.getItem('user') || '{}'); 
  apiBaseUrl = environment.apiBaseUrl;

  cerrarSesion(){
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}

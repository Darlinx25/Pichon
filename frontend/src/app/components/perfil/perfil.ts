import { Component, inject } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {
  router = inject(Router);
  user = JSON.parse(localStorage.getItem('user') || '{}');
  apiBaseUrl = environment.apiBaseUrl;

   cerrarSesion() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}

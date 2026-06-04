import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-usuarios',
  imports: [RouterLink],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios implements OnInit {
  router = inject(Router);
  apiBaseUrl = environment.apiBaseUrl;
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  usuariosEncontrados: any[] = [];

  ngOnInit() {
    console.log('Usuarios iniciado');
    this.userService.listarUsuarios().subscribe((usuarios) => {
      console.log('Respuesta:', usuarios);
      this.usuariosEncontrados = usuarios;
      this.cdr.detectChanges();
    });
  }
}
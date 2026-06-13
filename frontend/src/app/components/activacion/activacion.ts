import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-activacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './activacion.html',
  styleUrl: './activacion.scss',
})
export class Activacion implements OnInit {
  mensaje = 'Activando cuenta...';
  cargando = true;
  success = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.mensaje = 'Token de activación no válido';
      this.cargando = false;
      return;
    }
    this.http.get<{ success?: boolean; message?: string; error?: string }>(
      `${environment.apiBaseUrl}/activarCuenta.php?token=${token}`
    ).subscribe({
      next: (res) => {
        if (res.success) {
          this.mensaje = res.message!;
          this.success = true;
        } else {
          this.mensaje = res.error!;
        }
        this.cargando = false;
      },
      error: () => {
        this.mensaje = 'Error de conexión con el servidor';
        this.cargando = false;
      },
    });
  }
}
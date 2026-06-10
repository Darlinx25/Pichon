import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  buscarUsuarios(texto: string) {
    return this.http.get<any[]>(
      `${environment.apiBaseUrl}/buscarUsuarios.php?search=${encodeURIComponent(texto)}`
    );
  }

  listarUsuarios(){
    return this.http.get<any[]>(
      `${environment.apiBaseUrl}/listarUsuarios.php`
    );
  }

  getPerfil(id: number, usuarioActual?: number) {
  const url = usuarioActual
    ? `${environment.apiBaseUrl}/perfil.php?id=${id}&usuario_actual=${usuarioActual}`
    : `${environment.apiBaseUrl}/perfil.php?id=${id}`;
  return this.http.get<any>(url);
}

  actualizarPerfil(formData: FormData) {
  return this.http.post<any>(`${environment.apiBaseUrl}/editar-perfil.php`, formData);
}

agregarContacto(usuarioId: number, contactoId: number) {
  return this.http.post(`${environment.apiBaseUrl}/agregarContacto.php`, { id_usuario: usuarioId, id_contacto: contactoId });
}

eliminarContacto(usuarioId: number, contactoId: number) {
  return this.http.post(`${environment.apiBaseUrl}/eliminarContacto.php`, { id_usuario: usuarioId, id_contacto: contactoId });
}

listarContactos(usuarioId: number) {
  return this.http.get<any[]>(`${environment.apiBaseUrl}/listarContactos.php?id_usuario=${usuarioId}`);
}
}

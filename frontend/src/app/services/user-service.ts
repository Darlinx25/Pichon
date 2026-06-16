import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }
  buscarUsuarios(texto: string) {
    return this.http.get<any[]>(
      `${environment.apiBaseUrl}/buscarUsuarios.php?search=${encodeURIComponent(texto)}`
    );
  }
  listarUsuarios() {
    return this.http.get<any[]>(
      `${environment.apiBaseUrl}/listarUsuarios.php`
    );
  }
  getPerfil(id: number) {                           
    return this.http.get<any>(
      `${environment.apiBaseUrl}/perfil.php?id=${id}`
    );
  }
  actualizarPerfil(formData: FormData) {
    return this.http.post<any>(`${environment.apiBaseUrl}/editar-perfil.php`, formData);
  }
  agregarContacto(contactoId: number) {              
    return this.http.post(`${environment.apiBaseUrl}/agregarContacto.php`, { id_contacto: contactoId });
  }
  eliminarContacto(contactoId: number) {            
    return this.http.post(`${environment.apiBaseUrl}/eliminarContacto.php`, { id_contacto: contactoId });
  }
  listarContactos() {                                
    return this.http.get<any[]>(`${environment.apiBaseUrl}/listarContactos.php`);
  }
  listarChats() {                                
    return this.http.get<any[]>(`${environment.apiBaseUrl}/listarChats.php`);
  }

}
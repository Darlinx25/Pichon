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

  getPerfil(id: number) {
  return this.http.get<any>(`${environment.apiBaseUrl}/perfil.php?id=${id}`);
}

}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';



@Component({
  selector: 'app-sidebar',
  imports: [ReactiveFormsModule],
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

  private formBuilder = inject(FormBuilder);

  usuariosEncontrados: any[] = [];

  searchForm = this.formBuilder.group({
    busqueda: ['']
  });

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.searchForm.get('busqueda')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(texto => (texto?.trim().length ?? 0) >= 2),
        switchMap(texto =>
          this.userService.buscarUsuarios(texto ?? '')
        )
      )
      .subscribe(usuarios => {
        this.usuariosEncontrados = usuarios;
      });
  }
}

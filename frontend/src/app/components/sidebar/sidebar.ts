import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { debounceTime, distinctUntilChanged, filter, of, switchMap } from 'rxjs';



@Component({
  selector: 'app-sidebar',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  router = inject(Router);
  user = JSON.parse(localStorage.getItem('user') || '{}');
  apiBaseUrl = environment.apiBaseUrl;

  cerrarSesion() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  private formBuilder = inject(FormBuilder);

  usuariosEncontrados: any[] = [];

  searchForm = this.formBuilder.group({
    busqueda: ['']
  });

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.searchForm.get('busqueda')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(texto => {
          if (!texto || texto.trim().length < 2) {
            return of([]);
          }

          return this.userService.buscarUsuarios(texto);
        })
      )
      .subscribe(usuarios => {
        this.usuariosEncontrados = usuarios;
        this.cdr.detectChanges();
      });
  }

  seleccionarUsuario(usuario: any) {
    console.log(usuario);

    //ver cómo pasar a campo del chat luego de clickear
    //y como ponerlo a la izquierda en chats "activos"

    this.usuariosEncontrados = [];
  }
}

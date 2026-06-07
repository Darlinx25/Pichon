import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { debounceTime, distinctUntilChanged, filter, of, switchMap } from 'rxjs';
import { ChatService } from '../../services/chat-servise';



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
  listaUsuarios: any [] = [];

  searchForm = this.formBuilder.group({
    busqueda: ['']
  });

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private chatService: ChatService
  ) { }

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

      //Luego remplazamos listarUsuarios por ListarContactos y listo
      this.userService.listarUsuarios().subscribe((usuarios) => {
      console.log('Respuesta:', usuarios);
      this.listaUsuarios = usuarios;
      this.cdr.detectChanges();
      });
       



  }

  seleccionarUsuario(usuario: any) {
    this.chatService.selectUser(usuario);
    this.usuariosEncontrados = [];
  }
}

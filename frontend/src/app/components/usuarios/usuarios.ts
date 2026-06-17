import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { environment } from '../../../environments/environment';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat-servise';

@Component({
  selector: 'app-usuarios',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios implements OnInit {
  private formBuilder = inject(FormBuilder);
  router = inject(Router);
  apiBaseUrl = environment.apiBaseUrl;
  searchForm = this.formBuilder.group({ busqueda: [''] });
  currentPage = 1;
  pageSize = 3;
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private chatService: ChatService
  ) { }

  usuarios: any[] = [];
  usuariosEncontrados: any[] = [];
  usuarioSeleccionado: any = null;

  ngOnInit() {
    console.log('Usuarios iniciado');
    
    this.userService.listarUsuarios().subscribe((usuarios) => {
      console.log('Respuesta:', usuarios);
      this.usuarios = usuarios;
      this.currentPage = 1;
      this.usuariosEncontrados = [];
      this.cdr.detectChanges();
      
    });
    
    this.searchForm.get('busqueda')?.valueChanges.subscribe(texto => { 
      if (!texto || texto.trim().length === 0) {
        this.usuariosEncontrados = [];
      } else {
        const busqueda = texto.toLowerCase();
        this.usuariosEncontrados = this.usuarios.filter(u => u.alias.toLowerCase().includes(busqueda)
        );
      }
      this.cdr.detectChanges();
    });
  }

  seleccionarUsuario(usuario: any) {
    this.router.navigate(['/perfil', usuario.id]);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-avatar.jpg';
  }
  
  get paginatedUsuarios(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.usuarios.slice(start, start + this.pageSize);
  }
  get totalPages(): number {
    return Math.ceil(this.usuarios.length / this.pageSize);
  }

  cambiarPagina(pagina: number) {
    this.currentPage = pagina;
  }
}
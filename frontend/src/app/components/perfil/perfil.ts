import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user-service';
@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit {
  user: any;
  perfilData: any = null;
  apiBaseUrl = environment.apiBaseUrl;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }
  cerrarSesion() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-avatar.jpg';
  }
  ngOnInit() {
  const userId = this.route.snapshot.paramMap.get('id');
  if (userId) {
    this.userService.getPerfil(Number(userId), Number(this.user.id)).subscribe(data => {
      this.perfilData = data;
      this.cdr.detectChanges();
    });
  }
}
  
  esMiPerfil(): boolean {
  return Number(this.route.snapshot.paramMap.get('id')) === Number(this.user?.id);
}

agregarContacto() {
  this.userService.agregarContacto(this.user.id, this.perfilData.id).subscribe(() => {
    this.perfilData.esContacto = true;
    this.cdr.detectChanges();
  });
}

eliminarContacto() {
  this.userService.eliminarContacto(this.user.id, this.perfilData.id).subscribe(() => {
    this.perfilData.esContacto = false;
    this.cdr.detectChanges();
  });
}
}
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
    const userId = this.user?.id;
    if (userId) {
      this.userService.getPerfil(userId).subscribe(data => {
        this.perfilData = data;
        this.cdr.detectChanges();
      });
    }
  }
}
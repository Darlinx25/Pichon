import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat-servise';
@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit, OnDestroy {
  user: any = null;
  perfilData: any = null;
  apiBaseUrl = environment.apiBaseUrl;
  private authSub!: Subscription;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private chatService: ChatService
  ) {
    this.authSub = this.authService.user$.subscribe(u => {
      if (u === undefined) return;
      this.user = u;
      this.cdr.detectChanges();
    });
  }
  cerrarSesion() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-avatar.jpg';
  }
  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getPerfil(Number(userId)).subscribe(data => {
        this.perfilData = data;
        this.cdr.detectChanges();
      });
    }
  }
  esMiPerfil(): boolean {
    return Number(this.route.snapshot.paramMap.get('id')) === Number(this.user?.id);
  }
  agregarContacto() {
    this.userService.agregarContacto(this.perfilData.id).subscribe(() => {
      this.perfilData.esContacto = true;
      this.chatService.refreshContactos$.next(); 
      this.cdr.detectChanges();
    });
  }
  eliminarContacto() {
    this.userService.eliminarContacto(this.perfilData.id).subscribe(() => {
      this.perfilData.esContacto = false;
      this.chatService.refreshContactos$.next(); 
      this.cdr.detectChanges();
    });
  }
  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }
}
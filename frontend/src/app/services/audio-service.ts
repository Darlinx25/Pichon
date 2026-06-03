import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private sonidoNotificacion = new Audio('assets/notification.mp3');
  private isTabActive = !document.hidden;

  constructor() {
    document.addEventListener('visibilitychange', () => {
      this.isTabActive = !document.hidden;
    });
  }

  playNotificacion(): void {
    if (!this.isTabActive) {
      this.sonidoNotificacion.load();
      this.sonidoNotificacion.play().catch(err => console.error('Erorr al reproducir audio:', err));
    }
  }
}

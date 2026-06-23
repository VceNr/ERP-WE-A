import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, catchError, of } from 'rxjs';
import { ConfiguracionService } from '../../core/services/configuracion.service';
import { ConfiguracionGeneral, Integracion, ConfiguracionNotificacion } from '../../core/models/configuracion.model';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class Configuracion implements OnInit {
  private configuracionService = inject(ConfiguracionService);

  loading = true;
  error = false;
  general: ConfiguracionGeneral | null = null;
  integraciones: Integracion[] = [];
  notificaciones: ConfiguracionNotificacion[] = [];

  ngOnInit() {
    forkJoin({
      general:        this.configuracionService.getGeneral().pipe(catchError(() => of(null))),
      integraciones:  this.configuracionService.getIntegraciones().pipe(catchError(() => of([]))),
      notificaciones: this.configuracionService.getNotificaciones().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ general, integraciones, notificaciones }) => {
        this.general        = general;
        this.integraciones  = integraciones;
        this.notificaciones = notificaciones;
        this.loading        = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}

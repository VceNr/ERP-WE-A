import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, catchError, of } from 'rxjs';
import { SectionPanel } from '../section-panel/section-panel';
import { AuditoriaService } from '../../core/services/auditoria.service';
import { LogAuditoria, AlertaSeguridad } from '../../core/models/auditoria.model';

@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [CommonModule, SectionPanel],
  templateUrl: './auditoria.html',
  styleUrl: './auditoria.css',
})
export class Auditoria implements OnInit {
  private auditoriaService = inject(AuditoriaService);

  loading = true;
  error = false;
  logs: LogAuditoria[] = [];
  alertas: AlertaSeguridad[] = [];
  actividadModulos: any[] = [];

  ngOnInit() {
    forkJoin({
      logs:             this.auditoriaService.getLogs().pipe(catchError(() => of([]))),
      alertas:          this.auditoriaService.getAlertasSeguridad().pipe(catchError(() => of([]))),
      actividadModulos: this.auditoriaService.getActividadPorModulo().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ logs, alertas, actividadModulos }) => {
        this.logs             = logs;
        this.alertas          = alertas;
        this.actividadModulos = actividadModulos;
        this.loading          = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LogAuditoria, AlertaSeguridad } from '../models/auditoria.model';

@Injectable({ providedIn: 'root' })
export class AuditoriaService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/auditoria`;

  getLogs() { return this.http.get<LogAuditoria[]>(`${this.base}/logs`); }
  getLog(id: string) { return this.http.get<LogAuditoria>(`${this.base}/logs/${id}`); }
  getAlertasSeguridad() { return this.http.get<AlertaSeguridad[]>(`${this.base}/alertas`); }
  getActividadPorModulo() { return this.http.get<any[]>(`${this.base}/actividad-por-modulo`); }
  getEstadoSistema() { return this.http.get<any>(`${this.base}/estado-sistema`); }
  ejecutarBackup() { return this.http.post(`${this.base}/backup`, {}); }
  getHistorialBackup() { return this.http.get<any[]>(`${this.base}/historial-backup`); }
}

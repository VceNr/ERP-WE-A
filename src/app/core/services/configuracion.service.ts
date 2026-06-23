import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ConfiguracionGeneral, Integracion, ConfiguracionNotificacion } from '../models/configuracion.model';

@Injectable({ providedIn: 'root' })
export class ConfiguracionService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/config`;

  getGeneral() { return this.http.get<ConfiguracionGeneral>(`${this.base}/general`); }
  actualizarGeneral(data: Partial<ConfiguracionGeneral>) { return this.http.put<ConfiguracionGeneral>(`${this.base}/general`, data); }
  getIntegraciones() { return this.http.get<Integracion[]>(`${this.base}/integraciones`); }
  actualizarIntegracion(id: string, data: Partial<Integracion>) { return this.http.put<Integracion>(`${this.base}/integraciones/${id}`, data); }
  getNotificaciones() { return this.http.get<ConfiguracionNotificacion[]>(`${this.base}/notificaciones`); }
  actualizarNotificaciones(data: any) { return this.http.put(`${this.base}/notificaciones`, data); }
}

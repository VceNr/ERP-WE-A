import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Reporte } from '../models/reportes.model';

@Injectable({ providedIn: 'root' })
export class ReportesService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/reportes`;

  getReportes() { return this.http.get<Reporte[]>(`${this.base}`); }
  getReporte(id: string) { return this.http.get<Reporte>(`${this.base}/${id}`); }
  generarReporte(id: string) { return this.http.post(`${this.base}/${id}/generar`, {}); }
  exportarReporte(id: string) { return this.http.get(`${this.base}/${id}/exportar`, { responseType: 'blob' }); }
  getProgramados() { return this.http.get<Reporte[]>(`${this.base}/programados`); }
  getDescargasRecientes() { return this.http.get<any[]>(`${this.base}/descargas-recientes`); }
}

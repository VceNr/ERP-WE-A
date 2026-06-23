import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OrdenProduccion, LineaProduccion } from '../models/produccion.model';

@Injectable({ providedIn: 'root' })
export class ProduccionService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/produccion`;

  getKpis() { return this.http.get<any[]>(`${this.base}/kpis`); }
  getOrdenes() { return this.http.get<OrdenProduccion[]>(`${this.base}/ordenes`); }
  getOrden(id: string) { return this.http.get<OrdenProduccion>(`${this.base}/ordenes/${id}`); }
  crearOrden(data: Partial<OrdenProduccion>) { return this.http.post<OrdenProduccion>(`${this.base}/ordenes`, data); }
  actualizarOrden(id: string, data: Partial<OrdenProduccion>) { return this.http.put<OrdenProduccion>(`${this.base}/ordenes/${id}`, data); }
  getLineas() { return this.http.get<LineaProduccion[]>(`${this.base}/lineas`); }
  actualizarLinea(id: string, data: Partial<LineaProduccion>) { return this.http.put<LineaProduccion>(`${this.base}/lineas/${id}`, data); }
}

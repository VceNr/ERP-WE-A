import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OrdenVenta, Vendedor, CanalVenta } from '../models/ventas.model';

@Injectable({ providedIn: 'root' })
export class VentasService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/ventas`;

  getKpis() { return this.http.get<any[]>(`${this.base}/kpis`); }
  getOrdenes() { return this.http.get<OrdenVenta[]>(`${this.base}/ordenes`); }
  getOrden(id: string) { return this.http.get<OrdenVenta>(`${this.base}/ordenes/${id}`); }
  crearOrden(data: Partial<OrdenVenta>) { return this.http.post<OrdenVenta>(`${this.base}/ordenes`, data); }
  actualizarOrden(id: string, data: Partial<OrdenVenta>) { return this.http.put<OrdenVenta>(`${this.base}/ordenes/${id}`, data); }
  eliminarOrden(id: string) { return this.http.delete(`${this.base}/ordenes/${id}`); }
  getVendedores() { return this.http.get<Vendedor[]>(`${this.base}/vendedores`); }
  getCanales() { return this.http.get<CanalVenta[]>(`${this.base}/canales`); }
}

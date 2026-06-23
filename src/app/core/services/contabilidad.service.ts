import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Factura, AsientoContable } from '../models/contabilidad.model';

@Injectable({ providedIn: 'root' })
export class ContabilidadService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/contabilidad`;

  getKpis() { return this.http.get<any[]>(`${this.base}/kpis`); }
  getFacturas() { return this.http.get<Factura[]>(`${this.base}/facturas`); }
  getFactura(id: string) { return this.http.get<Factura>(`${this.base}/facturas/${id}`); }
  crearFactura(data: Partial<Factura>) { return this.http.post<Factura>(`${this.base}/facturas`, data); }
  actualizarFactura(id: string, data: Partial<Factura>) { return this.http.put<Factura>(`${this.base}/facturas/${id}`, data); }
  getAsientos() { return this.http.get<AsientoContable[]>(`${this.base}/asientos`); }
  crearAsiento(data: Partial<AsientoContable>) { return this.http.post<AsientoContable>(`${this.base}/asientos`, data); }
  getBalanceGeneral() { return this.http.get<any>(`${this.base}/balance-general`); }
  getEstadoResultados() { return this.http.get<any>(`${this.base}/estado-resultados`); }
}

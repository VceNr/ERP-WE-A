import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OrdenCompra, Proveedor } from '../models/compras.model';

@Injectable({ providedIn: 'root' })
export class ComprasService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/compras`;

  getKpis() { return this.http.get<any[]>(`${this.base}/kpis`); }
  getOrdenes() { return this.http.get<OrdenCompra[]>(`${this.base}/ordenes`); }
  getOrden(id: string) { return this.http.get<OrdenCompra>(`${this.base}/ordenes/${id}`); }
  crearOrden(data: Partial<OrdenCompra>) { return this.http.post<OrdenCompra>(`${this.base}/ordenes`, data); }
  actualizarOrden(id: string, data: Partial<OrdenCompra>) { return this.http.put<OrdenCompra>(`${this.base}/ordenes/${id}`, data); }
  getProveedores() { return this.http.get<Proveedor[]>(`${this.base}/proveedores`); }
  getProveedor(id: string) { return this.http.get<Proveedor>(`${this.base}/proveedores/${id}`); }
  crearProveedor(data: Partial<Proveedor>) { return this.http.post<Proveedor>(`${this.base}/proveedores`, data); }
  getGastoPorCategoria() { return this.http.get<any[]>(`${this.base}/gasto-por-categoria`); }
}

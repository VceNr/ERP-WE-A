import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Cliente } from '../models/clientes.model';

@Injectable({ providedIn: 'root' })
export class ClientesService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/clientes`;

  getKpis() { return this.http.get<any[]>(`${this.base}/kpis`); }
  getClientes() { return this.http.get<Cliente[]>(`${this.base}`); }
  getCliente(id: string) { return this.http.get<Cliente>(`${this.base}/${id}`); }
  crearCliente(data: Partial<Cliente>) { return this.http.post<Cliente>(`${this.base}`, data); }
  actualizarCliente(id: string, data: Partial<Cliente>) { return this.http.put<Cliente>(`${this.base}/${id}`, data); }
  getOrdenesPorCliente(id: string) { return this.http.get<any[]>(`${this.base}/${id}/ordenes`); }
  getDeuda(id: string) { return this.http.get<any>(`${this.base}/${id}/deuda`); }
  getSegmentos() { return this.http.get<any[]>(`${this.base}/segmentos`); }
  getActividadReciente() { return this.http.get<any[]>(`${this.base}/actividad-reciente`); }
}

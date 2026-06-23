import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Producto, MovimientoInventario } from '../models/inventario.model';

@Injectable({ providedIn: 'root' })
export class InventarioService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/inventario`;

  getKpis() { return this.http.get<any[]>(`${this.base}/kpis`); }
  getProductos() { return this.http.get<Producto[]>(`${this.base}/productos`); }
  getProducto(sku: string) { return this.http.get<Producto>(`${this.base}/productos/${sku}`); }
  crearProducto(data: Partial<Producto>) { return this.http.post<Producto>(`${this.base}/productos`, data); }
  actualizarProducto(sku: string, data: Partial<Producto>) { return this.http.put<Producto>(`${this.base}/productos/${sku}`, data); }
  getStockCritico() { return this.http.get<Producto[]>(`${this.base}/stock-critico`); }
  getMovimientos() { return this.http.get<MovimientoInventario[]>(`${this.base}/movimientos`); }
  registrarAjuste(data: any) { return this.http.post(`${this.base}/ajustes`, data); }
  getCategorias() { return this.http.get<any[]>(`${this.base}/categorias`); }
}

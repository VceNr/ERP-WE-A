import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MovimientoFinanciero, CuentaBancaria } from '../models/finanzas.model';

@Injectable({ providedIn: 'root' })
export class FinanzasService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/finanzas`;

  getKpis() { return this.http.get<any[]>(`${this.base}/kpis`); }
  getMovimientos() { return this.http.get<MovimientoFinanciero[]>(`${this.base}/movimientos`); }
  registrarMovimiento(data: Partial<MovimientoFinanciero>) { return this.http.post<MovimientoFinanciero>(`${this.base}/movimientos`, data); }
  getCuentasBancarias() { return this.http.get<CuentaBancaria[]>(`${this.base}/cuentas`); }
  getCuentasPorCobrar() { return this.http.get<any[]>(`${this.base}/cuentas-por-cobrar`); }
  getCuentasPorPagar() { return this.http.get<any[]>(`${this.base}/cuentas-por-pagar`); }
  getFlujoCaja() { return this.http.get<any>(`${this.base}/flujo-caja`); }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Empleado, Departamento } from '../models/rrhh.model';

@Injectable({ providedIn: 'root' })
export class RrhhService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/rrhh`;

  getKpis() { return this.http.get<any[]>(`${this.base}/kpis`); }
  getEmpleados() { return this.http.get<Empleado[]>(`${this.base}/empleados`); }
  getEmpleado(id: string) { return this.http.get<Empleado>(`${this.base}/empleados/${id}`); }
  crearEmpleado(data: Partial<Empleado>) { return this.http.post<Empleado>(`${this.base}/empleados`, data); }
  actualizarEmpleado(id: string, data: Partial<Empleado>) { return this.http.put<Empleado>(`${this.base}/empleados/${id}`, data); }
  getDepartamentos() { return this.http.get<Departamento[]>(`${this.base}/departamentos`); }
  getEmpleadosPorDepartamento(id: string) { return this.http.get<Empleado[]>(`${this.base}/departamentos/${id}/empleados`); }
  getCumpleanosProximos() { return this.http.get<any[]>(`${this.base}/cumpleanos-proximos`); }
  getAusencias() { return this.http.get<any[]>(`${this.base}/ausencias`); }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Proyecto, TareaProyecto, HorasProyecto } from '../models/proyectos.model';

@Injectable({ providedIn: 'root' })
export class ProyectosService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/proyectos`;

  getKpis() { return this.http.get<any[]>(`${this.base}/kpis`); }
  getProyectos() { return this.http.get<Proyecto[]>(`${this.base}`); }
  getProyecto(id: string) { return this.http.get<Proyecto>(`${this.base}/${id}`); }
  crearProyecto(data: Partial<Proyecto>) { return this.http.post<Proyecto>(`${this.base}`, data); }
  actualizarProyecto(id: string, data: Partial<Proyecto>) { return this.http.put<Proyecto>(`${this.base}/${id}`, data); }
  getTareas(proyectoId: string) { return this.http.get<TareaProyecto[]>(`${this.base}/${proyectoId}/tareas`); }
  crearTarea(proyectoId: string, data: Partial<TareaProyecto>) { return this.http.post<TareaProyecto>(`${this.base}/${proyectoId}/tareas`, data); }
  getHoras(proyectoId: string) { return this.http.get<HorasProyecto[]>(`${this.base}/${proyectoId}/horas`); }
  registrarHoras(proyectoId: string, data: Partial<HorasProyecto>) { return this.http.post<HorasProyecto>(`${this.base}/${proyectoId}/horas`, data); }
}

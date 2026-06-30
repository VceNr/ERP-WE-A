import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, catchError, of, switchMap, map } from 'rxjs';
import { SectionPanel } from '../section-panel/section-panel';
import { Skeleton } from '../skeleton/skeleton';
import { ProyectosService } from '../../core/services/proyectos.service';
import { ClientesService } from '../../core/services/clientes.service';
import { Proyecto } from '../../core/models/proyectos.model';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionPanel, Skeleton],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css',
})
export class Proyectos implements OnInit {
  private proyectosService = inject(ProyectosService);
  private clientesService = inject(ClientesService);
  private fb = inject(FormBuilder);

  loading = true;
  error = false;
  kpis: any = null;
  proyectos: Proyecto[] = [];
  tareas: any[] = [];
  clientesLista: any[] = [];

  modalAbierto = false;
  saving = false;
  errorModal = '';

  formProyecto: FormGroup = this.fb.group({
    nombre:       ['', Validators.required],
    cliente:      ['', Validators.required],
    responsable:  ['', Validators.required],
    fecha_limite: ['', Validators.required],
    estado:       ['Planificación'],
  });

  abrirModal() { this.modalAbierto = true; this.errorModal = ''; }
  cerrarModal() { this.modalAbierto = false; this.errorModal = ''; }

  guardarProyecto() {
    if (this.formProyecto.invalid) return;
    this.saving = true;
    this.proyectosService.crearProyecto(this.formProyecto.value).subscribe({
      next: () => { this.saving = false; this.formProyecto.reset({ estado: 'Planificación' }); this.cerrarModal(); },
      error: (err) => {
        this.saving = false;
        this.errorModal = err?.error?.message || 'Error al guardar. Verifica los datos e inténtalo de nuevo.';
      },
    });
  }

  ngOnInit() {
    forkJoin({
      kpis:         this.proyectosService.getKpis().pipe(catchError(() => of([]))),
      proyectos:    this.proyectosService.getProyectos().pipe(catchError(() => of([]))),
      clientesLista: this.clientesService.getClientes().pipe(catchError(() => of([]))),
    }).pipe(
      switchMap(({ kpis, proyectos, clientesLista }) => {
        const tareas$ = proyectos.length > 0
          ? this.proyectosService.getTareas(String(proyectos[0].id)).pipe(catchError(() => of([])))
          : of([]);
        return tareas$.pipe(map(tareas => ({ kpis, proyectos, tareas, clientesLista })));
      })
    ).subscribe({
      next: ({ kpis, proyectos, tareas, clientesLista }) => {
        this.kpis          = kpis;
        this.proyectos     = proyectos;
        this.tareas        = tareas;
        this.clientesLista = clientesLista;
        this.loading       = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}

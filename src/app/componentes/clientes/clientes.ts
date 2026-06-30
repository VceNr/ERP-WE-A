import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, catchError, of } from 'rxjs';
import { SectionPanel } from '../section-panel/section-panel';
import { Skeleton } from '../skeleton/skeleton';
import { ClientesService } from '../../core/services/clientes.service';
import { Cliente } from '../../core/models/clientes.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionPanel, Skeleton],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes implements OnInit {
  private clientesService = inject(ClientesService);
  private fb = inject(FormBuilder);

  loading = true;
  error = false;
  kpis: any = null;
  clientes: Cliente[] = [];
  segmentos: any[] = [];
  actividad: any[] = [];

  modalAbierto = false;
  saving = false;
  errorModal = '';

  formCliente: FormGroup = this.fb.group({
    nombre:    ['', Validators.required],
    rut:       ['', Validators.required],
    email:     ['', [Validators.required, Validators.email]],
    telefono:  [''],
    segmento:  ['Estándar'],
    direccion: [''],
  });

  abrirModal() { this.modalAbierto = true; this.errorModal = ''; }
  cerrarModal() { this.modalAbierto = false; this.errorModal = ''; }

  guardarCliente() {
    if (this.formCliente.invalid) return;
    this.saving = true;
    this.clientesService.crearCliente(this.formCliente.value).subscribe({
      next: () => { this.saving = false; this.formCliente.reset({ segmento: 'Estándar' }); this.cerrarModal(); },
      error: (err) => {
        this.saving = false;
        this.errorModal = err?.error?.message || 'Error al guardar. Verifica los datos e inténtalo de nuevo.';
      },
    });
  }

  ngOnInit() {
    forkJoin({
      kpis:      this.clientesService.getKpis().pipe(catchError(() => of([]))),
      clientes:  this.clientesService.getClientes().pipe(catchError(() => of([]))),
      segmentos: this.clientesService.getSegmentos().pipe(catchError(() => of([]))),
      actividad: this.clientesService.getActividadReciente().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ kpis, clientes, segmentos, actividad }) => {
        this.kpis      = kpis;
        this.clientes  = clientes;
        this.segmentos = segmentos;
        this.actividad = actividad;
        this.loading   = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}

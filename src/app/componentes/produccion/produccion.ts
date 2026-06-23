import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, catchError, of } from 'rxjs';
import { SectionPanel } from '../section-panel/section-panel';
import { ProduccionService } from '../../core/services/produccion.service';
import { OrdenProduccion, LineaProduccion } from '../../core/models/produccion.model';

@Component({
  selector: 'app-produccion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionPanel],
  templateUrl: './produccion.html',
  styleUrl: './produccion.css',
})
export class Produccion implements OnInit {
  private produccionService = inject(ProduccionService);
  private fb = inject(FormBuilder);

  loading = true;
  error = false;
  kpis: any[] = [];
  ordenes: OrdenProduccion[] = [];
  lineas: LineaProduccion[] = [];

  modalAbierto = false;
  saving = false;
  errorModal = '';

  formOrdenProd: FormGroup = this.fb.group({
    producto:         ['', Validators.required],
    cantidad:         [null, Validators.required],
    linea_produccion: ['', Validators.required],
    fecha_inicio:     [''],
    fecha_fin:        [''],
  });

  abrirModal() { this.modalAbierto = true; this.errorModal = ''; }
  cerrarModal() { this.modalAbierto = false; this.errorModal = ''; }

  guardarOrdenProd() {
    if (this.formOrdenProd.invalid) return;
    this.saving = true;
    this.produccionService.crearOrden(this.formOrdenProd.value).subscribe({
      next: () => { this.saving = false; this.formOrdenProd.reset(); this.cerrarModal(); },
      error: (err) => {
        this.saving = false;
        this.errorModal = err?.error?.message || 'Error al guardar. Verifica los datos e inténtalo de nuevo.';
      },
    });
  }

  ngOnInit() {
    forkJoin({
      kpis:    this.produccionService.getKpis().pipe(catchError(() => of([]))),
      ordenes: this.produccionService.getOrdenes().pipe(catchError(() => of([]))),
      lineas:  this.produccionService.getLineas().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ kpis, ordenes, lineas }) => {
        this.kpis    = kpis;
        this.ordenes = ordenes;
        this.lineas  = lineas;
        this.loading = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}

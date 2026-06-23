import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, catchError, of } from 'rxjs';
import { SectionPanel } from '../section-panel/section-panel';
import { ComprasService } from '../../core/services/compras.service';
import { OrdenCompra, Proveedor } from '../../core/models/compras.model';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionPanel],
  templateUrl: './compras.html',
  styleUrl: './compras.css',
})
export class Compras implements OnInit {
  private comprasService = inject(ComprasService);
  private fb = inject(FormBuilder);

  loading = true;
  error = false;
  kpis: any[] = [];
  ordenes: OrdenCompra[] = [];
  proveedores: Proveedor[] = [];
  gastoCategorias: any[] = [];

  modalAbierto = false;
  saving = false;
  errorModal = '';

  formOrden: FormGroup = this.fb.group({
    proveedor:      ['', Validators.required],
    descripcion:    ['', Validators.required],
    monto:          [null, Validators.required],
    fecha_entrega:  [''],
    estado:         ['Pendiente'],
  });

  abrirModal() { this.modalAbierto = true; this.errorModal = ''; }
  cerrarModal() { this.modalAbierto = false; this.errorModal = ''; }

  guardarOrden() {
    if (this.formOrden.invalid) return;
    this.saving = true;
    this.comprasService.crearOrden(this.formOrden.value).subscribe({
      next: () => { this.saving = false; this.formOrden.reset({ estado: 'Pendiente' }); this.cerrarModal(); },
      error: (err) => {
        this.saving = false;
        this.errorModal = err?.error?.message || 'Error al guardar. Verifica los datos e inténtalo de nuevo.';
      },
    });
  }

  ngOnInit() {
    forkJoin({
      kpis:            this.comprasService.getKpis().pipe(catchError(() => of([]))),
      ordenes:         this.comprasService.getOrdenes().pipe(catchError(() => of([]))),
      proveedores:     this.comprasService.getProveedores().pipe(catchError(() => of([]))),
      gastoCategorias: this.comprasService.getGastoPorCategoria().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ kpis, ordenes, proveedores, gastoCategorias }) => {
        this.kpis            = kpis;
        this.ordenes         = ordenes;
        this.proveedores     = proveedores;
        this.gastoCategorias = gastoCategorias;
        this.loading         = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}

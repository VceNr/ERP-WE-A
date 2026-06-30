import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, catchError, of } from 'rxjs';
import { SectionPanel } from '../section-panel/section-panel';
import { ContabilidadService } from '../../core/services/contabilidad.service';
import { Factura, AsientoContable } from '../../core/models/contabilidad.model';

@Component({
  selector: 'app-contabilidad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionPanel],
  templateUrl: './contabilidad.html',
  styleUrl: './contabilidad.css',
})
export class Contabilidad implements OnInit {
  private contabilidadService = inject(ContabilidadService);
  private fb = inject(FormBuilder);

  loading = true;
  error = false;
  kpis: any = null;
  facturas: Factura[] = [];
  asientos: AsientoContable[] = [];

  modalAbierto = false;
  saving = false;
  errorModal = '';

  formAsiento: FormGroup = this.fb.group({
    numero:      ['', Validators.required],
    cuenta:      ['', Validators.required],
    descripcion: ['', Validators.required],
    debe:        [null],
    haber:       [null],
    fecha:       [''],
  });

  abrirModal() { this.modalAbierto = true; this.errorModal = ''; }
  cerrarModal() { this.modalAbierto = false; this.errorModal = ''; }

  guardarAsiento() {
    if (this.formAsiento.invalid) return;
    this.saving = true;
    this.contabilidadService.crearAsiento(this.formAsiento.value).subscribe({
      next: () => { this.saving = false; this.formAsiento.reset(); this.cerrarModal(); },
      error: (err) => {
        this.saving = false;
        this.errorModal = err?.error?.message || 'Error al guardar. Verifica los datos e inténtalo de nuevo.';
      },
    });
  }

  ngOnInit() {
    forkJoin({
      kpis:     this.contabilidadService.getKpis().pipe(catchError(() => of([]))),
      facturas: this.contabilidadService.getFacturas().pipe(catchError(() => of([]))),
      asientos: this.contabilidadService.getAsientos().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ kpis, facturas, asientos }) => {
        this.kpis     = kpis;
        this.facturas = facturas;
        this.asientos = asientos;
        this.loading  = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}

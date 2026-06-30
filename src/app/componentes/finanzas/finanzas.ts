import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, catchError, of } from 'rxjs';
import { SectionPanel } from '../section-panel/section-panel';
import { FinanzasService } from '../../core/services/finanzas.service';
import { MovimientoFinanciero, CuentaBancaria } from '../../core/models/finanzas.model';

@Component({
  selector: 'app-finanzas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionPanel],
  templateUrl: './finanzas.html',
  styleUrl: './finanzas.css',
})
export class Finanzas implements OnInit {
  private finanzasService = inject(FinanzasService);
  private fb = inject(FormBuilder);

  loading = true;
  error = false;
  kpis: any = null;
  movimientos: MovimientoFinanciero[] = [];
  cuentas: CuentaBancaria[] = [];

  modalAbierto = false;
  saving = false;
  errorModal = '';

  formMovimiento: FormGroup = this.fb.group({
    concepto: ['', Validators.required],
    tipo:     ['Ingreso'],
    monto:    [null, Validators.required],
    cuenta:   ['', Validators.required],
    fecha:    [''],
  });

  abrirModal() { this.modalAbierto = true; this.errorModal = ''; }
  cerrarModal() { this.modalAbierto = false; this.errorModal = ''; }

  guardarMovimiento() {
    if (this.formMovimiento.invalid) return;
    this.saving = true;
    this.finanzasService.registrarMovimiento(this.formMovimiento.value).subscribe({
      next: () => { this.saving = false; this.formMovimiento.reset({ tipo: 'Ingreso' }); this.cerrarModal(); },
      error: (err) => {
        this.saving = false;
        this.errorModal = err?.error?.message || 'Error al guardar. Verifica los datos e inténtalo de nuevo.';
      },
    });
  }

  ngOnInit() {
    forkJoin({
      kpis:        this.finanzasService.getKpis().pipe(catchError(() => of([]))),
      movimientos: this.finanzasService.getMovimientos().pipe(catchError(() => of([]))),
      cuentas:     this.finanzasService.getCuentasBancarias().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ kpis, movimientos, cuentas }) => {
        this.kpis        = kpis;
        this.movimientos = movimientos;
        this.cuentas     = cuentas;
        this.loading     = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}

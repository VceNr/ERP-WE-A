import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, catchError, of } from 'rxjs';
import { SectionPanel } from '../section-panel/section-panel';
import { ReportesService } from '../../core/services/reportes.service';
import { Reporte } from '../../core/models/reportes.model';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionPanel],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {
  private reportesService = inject(ReportesService);
  private fb = inject(FormBuilder);

  loading = true;
  error = false;
  reportes: Reporte[] = [];
  programados: Reporte[] = [];
  descargas: any[] = [];

  modalAbierto = false;
  saving = false;
  errorModal = '';

  formReporte: FormGroup = this.fb.group({
    nombre:  ['', Validators.required],
    modulo:  ['Ventas'],
    formato: ['PDF'],
  });

  abrirModal() { this.modalAbierto = true; this.errorModal = ''; }
  cerrarModal() { this.modalAbierto = false; this.errorModal = ''; }

  guardarReporte() {
    if (this.formReporte.invalid) return;
    this.saving = true;
    this.reportesService.getReportes().subscribe({
      next: (reportes) => {
        this.reportes = reportes;
        this.saving = false;
        this.formReporte.reset({ modulo: 'Ventas', formato: 'PDF' });
        this.cerrarModal();
      },
      error: (err) => {
        this.saving = false;
        this.errorModal = err?.error?.message || 'Error al guardar. Verifica los datos e inténtalo de nuevo.';
      },
    });
  }

  ngOnInit() {
    forkJoin({
      reportes:    this.reportesService.getReportes().pipe(catchError(() => of([]))),
      programados: this.reportesService.getProgramados().pipe(catchError(() => of([]))),
      descargas:   this.reportesService.getDescargasRecientes().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ reportes, programados, descargas }) => {
        this.reportes    = reportes;
        this.programados = programados;
        this.descargas   = descargas;
        this.loading     = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}

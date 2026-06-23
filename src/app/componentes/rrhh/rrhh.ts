import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, catchError, of } from 'rxjs';
import { SectionPanel } from '../section-panel/section-panel';
import { RrhhService } from '../../core/services/rrhh.service';
import { Empleado, Departamento } from '../../core/models/rrhh.model';

@Component({
  selector: 'app-rrhh',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionPanel],
  templateUrl: './rrhh.html',
  styleUrl: './rrhh.css',
})
export class Rrhh implements OnInit {
  private rrhhService = inject(RrhhService);
  private fb = inject(FormBuilder);

  loading = true;
  error = false;
  kpis: any[] = [];
  empleados: Empleado[] = [];
  departamentos: Departamento[] = [];
  cumpleanios: any[] = [];

  modalAbierto = false;
  saving = false;
  errorModal = '';

  formEmpleado: FormGroup = this.fb.group({
    nombre:        ['', Validators.required],
    cargo:         ['', Validators.required],
    departamento:  ['TI'],
    fecha_ingreso: [''],
    salario:       [null],
    email:         ['', [Validators.required, Validators.email]],
  });

  abrirModal() { this.modalAbierto = true; this.errorModal = ''; }
  cerrarModal() { this.modalAbierto = false; this.errorModal = ''; }

  guardarEmpleado() {
    if (this.formEmpleado.invalid) return;
    this.saving = true;
    this.rrhhService.crearEmpleado(this.formEmpleado.value).subscribe({
      next: () => { this.saving = false; this.formEmpleado.reset({ departamento: 'TI' }); this.cerrarModal(); },
      error: (err) => {
        this.saving = false;
        this.errorModal = err?.error?.message || 'Error al guardar. Verifica los datos e inténtalo de nuevo.';
      },
    });
  }

  ngOnInit() {
    forkJoin({
      kpis:          this.rrhhService.getKpis().pipe(catchError(() => of([]))),
      empleados:     this.rrhhService.getEmpleados().pipe(catchError(() => of([]))),
      departamentos: this.rrhhService.getDepartamentos().pipe(catchError(() => of([]))),
      cumpleanios:   this.rrhhService.getCumpleanosProximos().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ kpis, empleados, departamentos, cumpleanios }) => {
        this.kpis          = kpis;
        this.empleados     = empleados;
        this.departamentos = departamentos;
        this.cumpleanios   = cumpleanios;
        this.loading       = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}

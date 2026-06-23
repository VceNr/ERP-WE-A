import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, catchError, of } from 'rxjs';
import { SectionPanel } from '../section-panel/section-panel';
import { VentasService } from '../../core/services/ventas.service';
import { ClientesService } from '../../core/services/clientes.service';
import { OrdenVenta, Vendedor, CanalVenta } from '../../core/models/ventas.model';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionPanel],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css',
})
export class Ventas implements OnInit {
  private ventasService = inject(VentasService);
  private clientesService = inject(ClientesService);
  private fb = inject(FormBuilder);

  loading = true;
  error = false;
  kpis: any[] = [];
  ordenes: OrdenVenta[] = [];
  vendedores: Vendedor[] = [];
  canales: CanalVenta[] = [];
  clientesLista: any[] = [];

  modalAbierto = false;
  saving = false;
  errorModal = '';

  formVenta: FormGroup = this.fb.group({
    cliente:  ['', Validators.required],
    monto:    [null, Validators.required],
    vendedor: [''],
    estado:   ['Pendiente'],
    fecha:    [''],
  });

  abrirModal() { this.modalAbierto = true; this.errorModal = ''; }
  cerrarModal() { this.modalAbierto = false; this.errorModal = ''; }

  guardarVenta() {
    if (this.formVenta.invalid) return;
    this.saving = true;
    this.ventasService.crearOrden(this.formVenta.value).subscribe({
      next: () => { this.saving = false; this.formVenta.reset({ estado: 'Pendiente' }); this.cerrarModal(); },
      error: (err) => {
        this.saving = false;
        this.errorModal = err?.error?.message || 'Error al guardar. Verifica los datos e inténtalo de nuevo.';
      },
    });
  }

  ngOnInit() {
    forkJoin({
      kpis:         this.ventasService.getKpis().pipe(catchError(() => of([]))),
      ordenes:      this.ventasService.getOrdenes().pipe(catchError(() => of([]))),
      vendedores:   this.ventasService.getVendedores().pipe(catchError(() => of([]))),
      canales:      this.ventasService.getCanales().pipe(catchError(() => of([]))),
      clientesLista: this.clientesService.getClientes().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ kpis, ordenes, vendedores, canales, clientesLista }) => {
        this.kpis          = kpis;
        this.ordenes       = ordenes;
        this.vendedores    = vendedores;
        this.canales       = canales;
        this.clientesLista = clientesLista;
        this.loading       = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}

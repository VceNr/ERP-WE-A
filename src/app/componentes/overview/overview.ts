import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { catchError, of } from 'rxjs';
import { OverviewHeader } from '../overview-header/overview-header';
import { QuickActions } from '../quick-actions/quick-actions';
import { KpiCard } from '../kpi-card/kpi-card';
import { SectionPanel } from '../section-panel/section-panel';
import { Skeleton } from '../skeleton/skeleton';
import { DashboardService } from '../../core/services/dashboard.service';
import { KpiData, FinancialSummary, RecentOrder, Alert, RecentActivity } from '../../core/models/dashboard.model';
import { VentasService } from '../../core/services/ventas.service';
import { ComprasService } from '../../core/services/compras.service';
import { InventarioService } from '../../core/services/inventario.service';
import { ClientesService } from '../../core/services/clientes.service';
import { ContabilidadService } from '../../core/services/contabilidad.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, DecimalPipe, ReactiveFormsModule, OverviewHeader, QuickActions, KpiCard, SectionPanel, Skeleton],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview implements OnInit {
  private dashboardService = inject(DashboardService);
  private ventasService = inject(VentasService);
  private comprasService = inject(ComprasService);
  private inventarioService = inject(InventarioService);
  private clientesService = inject(ClientesService);
  private contabilidadService = inject(ContabilidadService);
  private fb = inject(FormBuilder);

  loading = true;
  error = false;
  kpis: KpiData[] = [];
  recentOrders: RecentOrder[] = [];
  alerts: Alert[] = [];
  financialSummary: FinancialSummary | null = null;
  recentActivity: RecentActivity[] = [];

  clientesLista: any[] = [];
  vendedoresLista: any[] = [];
  proveedoresLista: any[] = [];
  productosLista: any[] = [];

  modalActivo: string | null = null;
  saving = false;
  errorModal = '';

  formVenta: FormGroup = this.fb.group({
    cliente:  ['', Validators.required],
    monto:    [null, Validators.required],
    vendedor: [''],
    estado:   ['Pendiente'],
    fecha:    [''],
  });

  formOrdenCompra: FormGroup = this.fb.group({
    proveedor:     ['', Validators.required],
    descripcion:   ['', Validators.required],
    monto:         [null, Validators.required],
    fecha_entrega: [''],
    estado:        ['Pendiente'],
  });

  formAjusteStock: FormGroup = this.fb.group({
    sku:      ['', Validators.required],
    producto: ['', Validators.required],
    tipo:     ['Entrada'],
    cantidad: [null, Validators.required],
    nota:     [''],
  });

  formCliente: FormGroup = this.fb.group({
    nombre:    ['', Validators.required],
    rut:       ['', Validators.required],
    email:     ['', [Validators.required, Validators.email]],
    telefono:  [''],
    segmento:  ['Estándar'],
    direccion: [''],
  });

  formFactura: FormGroup = this.fb.group({
    numero:      ['', Validators.required],
    cuenta:      ['', Validators.required],
    descripcion: ['', Validators.required],
    debe:        [null],
    haber:       [null],
    fecha:       [''],
  });

  abrirModal(tipo: string) {
    this.modalActivo = tipo;
    this.errorModal = '';
  }

  cerrarModal() {
    this.modalActivo = null;
    this.errorModal = '';
  }

  seleccionarProductoOverview(event: Event) {
    const sku = (event.target as HTMLSelectElement).value;
    const prod = this.productosLista.find((p: any) => p.sku === sku);
    if (prod) {
      this.formAjusteStock.patchValue({ producto: prod.nombre });
    }
  }

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

  guardarOrdenCompra() {
    if (this.formOrdenCompra.invalid) return;
    this.saving = true;
    this.comprasService.crearOrden(this.formOrdenCompra.value).subscribe({
      next: () => { this.saving = false; this.formOrdenCompra.reset({ estado: 'Pendiente' }); this.cerrarModal(); },
      error: (err) => {
        this.saving = false;
        this.errorModal = err?.error?.message || 'Error al guardar. Verifica los datos e inténtalo de nuevo.';
      },
    });
  }

  guardarAjusteStock() {
    if (this.formAjusteStock.invalid) return;
    this.saving = true;
    this.inventarioService.registrarAjuste(this.formAjusteStock.value).subscribe({
      next: () => { this.saving = false; this.formAjusteStock.reset({ tipo: 'Entrada' }); this.cerrarModal(); },
      error: (err) => {
        this.saving = false;
        this.errorModal = err?.error?.message || 'Error al guardar. Verifica los datos e inténtalo de nuevo.';
      },
    });
  }

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

  guardarFactura() {
    if (this.formFactura.invalid) return;
    this.saving = true;
    this.contabilidadService.crearAsiento(this.formFactura.value).subscribe({
      next: () => { this.saving = false; this.formFactura.reset(); this.cerrarModal(); },
      error: (err) => {
        this.saving = false;
        this.errorModal = err?.error?.message || 'Error al guardar. Verifica los datos e inténtalo de nuevo.';
      },
    });
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
  }

  ngOnInit() {
    forkJoin({
      kpis:             this.dashboardService.getKpis().pipe(catchError(() => of([]))),
      recentOrders:     this.dashboardService.getRecentOrders().pipe(catchError(() => of([]))),
      alerts:           this.dashboardService.getAlerts().pipe(catchError(() => of([]))),
      financialSummary: this.dashboardService.getFinancialSummary().pipe(catchError(() => of(null))),
      recentActivity:   this.dashboardService.getRecentActivity().pipe(catchError(() => of([]))),
      clientesLista:    this.clientesService.getClientes().pipe(catchError(() => of([]))),
      vendedoresLista:  this.ventasService.getVendedores().pipe(catchError(() => of([]))),
      proveedoresLista: this.comprasService.getProveedores().pipe(catchError(() => of([]))),
      productosLista:   this.inventarioService.getProductos().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ kpis, recentOrders, alerts, financialSummary, recentActivity,
               clientesLista, vendedoresLista, proveedoresLista, productosLista }) => {
        this.kpis             = kpis;
        this.recentOrders     = recentOrders;
        this.alerts           = alerts;
        this.financialSummary = financialSummary;
        this.recentActivity   = recentActivity;
        this.clientesLista    = clientesLista;
        this.vendedoresLista  = vendedoresLista;
        this.proveedoresLista = proveedoresLista;
        this.productosLista   = productosLista;
        this.loading          = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}

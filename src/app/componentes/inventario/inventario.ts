import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, catchError, of } from 'rxjs';
import { SectionPanel } from '../section-panel/section-panel';
import { InventarioService } from '../../core/services/inventario.service';
import { Producto, MovimientoInventario } from '../../core/models/inventario.model';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionPanel],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
})
export class Inventario implements OnInit {
  private inventarioService = inject(InventarioService);
  private fb = inject(FormBuilder);

  loading = true;
  error = false;
  kpis: any = null;
  productos: Producto[] = [];
  stockCritico: Producto[] = [];
  movimientos: MovimientoInventario[] = [];
  categorias: any[] = [];

  modalAbierto = false;
  saving = false;
  errorModal = '';

  formAjuste: FormGroup = this.fb.group({
    sku:      ['', Validators.required],
    producto: ['', Validators.required],
    tipo:     ['Entrada'],
    cantidad: [null, Validators.required],
    nota:     [''],
  });

  abrirModal() { this.modalAbierto = true; this.errorModal = ''; }
  cerrarModal() { this.modalAbierto = false; this.errorModal = ''; }

  seleccionarProducto(event: Event) {
    const sku = (event.target as HTMLSelectElement).value;
    const prod = this.productos.find(p => p.sku === sku);
    if (prod) {
      this.formAjuste.patchValue({ producto: prod.nombre });
    }
  }

  guardarAjuste() {
    if (this.formAjuste.invalid) return;
    this.saving = true;
    this.inventarioService.registrarAjuste(this.formAjuste.value).subscribe({
      next: () => { this.saving = false; this.formAjuste.reset({ tipo: 'Entrada' }); this.cerrarModal(); },
      error: (err) => {
        this.saving = false;
        this.errorModal = err?.error?.message || 'Error al guardar. Verifica los datos e inténtalo de nuevo.';
      },
    });
  }

  ngOnInit() {
    forkJoin({
      kpis:        this.inventarioService.getKpis().pipe(catchError(() => of([]))),
      productos:   this.inventarioService.getProductos().pipe(catchError(() => of([]))),
      stockCritico: this.inventarioService.getStockCritico().pipe(catchError(() => of([]))),
      movimientos: this.inventarioService.getMovimientos().pipe(catchError(() => of([]))),
      categorias:  this.inventarioService.getCategorias().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ kpis, productos, stockCritico, movimientos, categorias }) => {
        this.kpis         = kpis;
        this.productos    = productos;
        this.stockCritico = stockCritico;
        this.movimientos  = movimientos;
        this.categorias   = categorias;
        this.loading      = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}

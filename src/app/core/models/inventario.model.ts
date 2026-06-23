export interface Producto { sku: string; nombre: string; categoria: string; stock: number; stockMinimo: number; precio: number; }
export interface MovimientoInventario { id: string; sku: string; tipo: string; cantidad: number; fecha: string; usuario: string; }

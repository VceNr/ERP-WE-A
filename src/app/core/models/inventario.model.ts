export interface Producto { id: number; sku: string; nombre: string; categoria: string; stock_actual: number; stock_minimo: number; precio: number; estado: string; }
export interface MovimientoInventario { id: number; tipo: string; producto_id: number; cantidad: number; nota: string; usuario: string; fecha: string; }

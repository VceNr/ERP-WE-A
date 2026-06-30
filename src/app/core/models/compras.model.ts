export interface OrdenCompra { id: number; numero: string; proveedor_id: number; descripcion: string; monto: number; estado: string; fecha_entrega: string; }
export interface Proveedor { id: number; nombre: string; categoria: string; total_ordenes: number; monto_total: number; estado: string; contacto: string; email: string; activo: boolean; }

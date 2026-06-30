export interface OrdenVenta { id: number; numero: string; cliente: string; cliente_id: number; vendedor: string; monto: number; estado: string; fecha: string; created_at: string; }
export interface Vendedor { id: number; nombre: string; ventas_total: number; meta: number; porcentaje_cumplimiento: number; activo: boolean; }
export interface CanalVenta { nombre: string; porcentaje: number; monto: number; }

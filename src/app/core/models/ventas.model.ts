export interface OrdenVenta { id: string; cliente: string; fecha: string; total: number; estado: string; vendedor: string; }
export interface Vendedor { id: string; nombre: string; ventas: number; meta: number; }
export interface CanalVenta { canal: string; porcentaje: number; monto: number; }

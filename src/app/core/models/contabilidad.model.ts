export interface Factura { id: number; numero: string; cliente_proveedor: string; tipo: string; monto: number; estado: string; fecha_vencimiento: string; }
export interface AsientoContable { id: number; numero: string; cuenta: string; debe: number; haber: number; fecha: string; descripcion: string; }

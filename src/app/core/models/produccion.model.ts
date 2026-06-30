export interface OrdenProduccion { id: number; numero: string; producto: string; cantidad: number; progreso: number; linea_produccion: string; estado: string; fecha_inicio: string; fecha_fin: string; }
export interface LineaProduccion { id: number; nombre: string; estado: string; eficiencia: number; }

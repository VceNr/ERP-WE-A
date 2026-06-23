export interface Proyecto { id: string; nombre: string; cliente: string; estado: string; progreso: number; fechaFin: string; }
export interface TareaProyecto { id: string; nombre: string; asignado: string; estado: string; vencimiento: string; }
export interface HorasProyecto { empleado: string; horas: number; fecha: string; descripcion: string; }

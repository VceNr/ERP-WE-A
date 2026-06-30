export interface Proyecto { id: number; nombre: string; cliente: string; responsable: string; progreso: number; fecha_limite: string; estado: string; }
export interface TareaProyecto { id: number; nombre: string; asignado: string; estado: string; vencimiento: string; }
export interface HorasProyecto { empleado: string; horas: number; fecha: string; descripcion: string; }

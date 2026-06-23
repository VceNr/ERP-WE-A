export interface ConfiguracionGeneral { empresa: string; rfc: string; email: string; telefono: string; moneda: string; }
export interface Integracion { id: string; nombre: string; activa: boolean; url: string; }
export interface ConfiguracionNotificacion { tipo: string; activa: boolean; email: boolean; sistema: boolean; }

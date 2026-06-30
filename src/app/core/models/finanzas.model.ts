export interface MovimientoFinanciero { id: number; tipo: string; concepto: string; monto: number; fecha: string; cuenta: string; }
export interface CuentaBancaria { id: number; banco: string; tipo: string; saldo: number; numero_cuenta: string; activo: boolean; }

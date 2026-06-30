export interface KpiData {
  label: string;
  value: string;
  delta: string;
  deltaDir: 'up' | 'down';
  color: string;
  sparkPath?: string;
}

export interface FinancialSummary {
  ingresos: number;
  gastos: number;
  utilidad: number;
  margen: number;
  cuentas_por_cobrar: number;
}

export interface RecentOrder {
  id: string;
  cliente: string;
  monto: number;
  estado: string;
  fecha: string;
}

export interface Alert {
  id: string;
  tipo: string;
  mensaje: string;
  modulo: string;
  fecha: string;
}

export interface RecentActivity {
  usuario: string;
  accion: string;
  modulo: string;
  fecha: string;
}

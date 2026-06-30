export interface Empleado { id: number; nombre: string; cargo: string; departamento: string; fecha_ingreso: string; estado: string; email: string; telefono: string; salario: number; activo: boolean; }
export interface Departamento { id: number; nombre: string; jefe: string; total_empleados: number; }

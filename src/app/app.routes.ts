import { Routes } from '@angular/router';
import { Home }         from './componentes/home/home';
import { Dashboard }    from './componentes/(dashboard)/dashboard';
import { Login }        from './componentes/login/login';
import { Overview }     from './componentes/overview/overview';
import { Ventas }       from './componentes/ventas/ventas';
import { Compras }      from './componentes/compras/compras';
import { Inventario }   from './componentes/inventario/inventario';
import { Clientes }     from './componentes/clientes/clientes';
import { Finanzas }     from './componentes/finanzas/finanzas';
import { Contabilidad } from './componentes/contabilidad/contabilidad';
import { Rrhh }         from './componentes/rrhh/rrhh';
import { Produccion }   from './componentes/produccion/produccion';
import { Proyectos }    from './componentes/proyectos/proyectos';
import { Reportes }     from './componentes/reportes/reportes';
import { Auditoria }    from './componentes/auditoria/auditoria';
import { Configuracion } from './componentes/configuracion/configuracion';
import { authGuard }    from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview',      component: Overview },
      { path: 'ventas',        component: Ventas },
      { path: 'compras',       component: Compras },
      { path: 'inventario',    component: Inventario },
      { path: 'clientes',      component: Clientes },
      { path: 'finanzas',      component: Finanzas },
      { path: 'contabilidad',  component: Contabilidad },
      { path: 'rrhh',          component: Rrhh },
      { path: 'produccion',    component: Produccion },
      { path: 'proyectos',     component: Proyectos },
      { path: 'reportes',      component: Reportes },
      { path: 'auditoria',     component: Auditoria },
      { path: 'configuracion', component: Configuracion },
    ]
  }
];

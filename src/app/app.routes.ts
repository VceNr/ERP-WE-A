import { Routes } from '@angular/router';
import { Home } from './componentes/home/home';
import { Dashboard } from './componentes/dashboard/dashboard';
import { Login } from './componentes/login/login';
import { Overview } from './componentes/overview/overview';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      // Ruta por defecto: redirige a overview
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: Overview },

      // Cada módulo cargará su propio componente aquí
      // Ejemplo: { path: 'ventas', component: Ventas },
      // Por ahora apuntan a overview hasta que crees cada componente
      { path: 'ventas',        component: Overview },
      { path: 'compras',       component: Overview },
      { path: 'inventario',    component: Overview },
      { path: 'clientes',      component: Overview },
      { path: 'finanzas',      component: Overview },
      { path: 'contabilidad',  component: Overview },
      { path: 'rrhh',          component: Overview },
      { path: 'produccion',    component: Overview },
      { path: 'proyectos',     component: Overview },
      { path: 'reportes',      component: Overview },
      { path: 'auditoria',     component: Overview },
      { path: 'configuracion', component: Overview },
    ]
  }
];

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, timeout, TimeoutError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    timeout(10000),
    catchError(err => {
      if (err instanceof TimeoutError) {
        return throwError(() => ({ error: { message: 'El servidor no responde. Verifica que la API esté activa.' } }));
      }
      if (err.status === 0) {
        return throwError(() => ({ error: { message: 'No se puede conectar con la API. Verifica que esté corriendo en localhost:3000.' } }));
      }
      if (err.status === 401) {
        localStorage.clear();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, timeout, TimeoutError, retry, timer } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    timeout(15000),
    retry({
      count: 2,
      delay: (error) => {
        if (error instanceof TimeoutError || error.status === 0) {
          return timer(8000);
        }
        return throwError(() => error);
      }
    }),
    catchError(err => {
      if (err instanceof TimeoutError) {
        return throwError(() => ({ error: { message: 'El servidor no responde. Puede estar iniciando, intenta de nuevo en un momento.' } }));
      }
      if (err.status === 0) {
        return throwError(() => ({ error: { message: 'No se puede conectar con la API.' } }));
      }
      if (err.status === 401) {
        localStorage.clear();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};

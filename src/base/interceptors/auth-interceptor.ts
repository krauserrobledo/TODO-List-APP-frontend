import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApiRepository } from '../../data/repositories/auth-api-repository';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authRepository = inject(AuthApiRepository);
  const router = inject(Router);

  return authRepository.getToken().pipe(
    switchMap(token => {
      let authReq = req;
      if (token) {
        authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
      }
      return next(authReq);
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authRepository.logout().subscribe();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};


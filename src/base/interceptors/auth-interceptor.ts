import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApiRepository } from '../../data/repositories/auth-api-repository';

/**
 *
 * @param req : HttpRequest<any>
 * @param next : HttpHandlerFn
 * @returns : Observable<HttpEvent<any>>
 *
 * An HTTP interceptor that adds the Authorization header to outgoing requests and handles 401 Unauthorized responses.
 */
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


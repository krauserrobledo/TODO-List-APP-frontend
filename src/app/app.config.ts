import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthRepository } from '../domain/repositories/auth-repository';
import { AuthApiRepository } from '../data/repositories/auth/auth-api-repository';
import { authInterceptor } from '../base/interceptors/auth-interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: AuthRepository,
      useClass: AuthApiRepository
    }
  ]
};
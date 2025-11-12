import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {  provideHttpClient } from '@angular/common/http';


import { AuthRepository } from '../domain/repositories/auth-repository';
import { AuthApiRepository } from '../data/repositories/auth/auth-api-repository';
import { RegisterUseCase } from '../domain/usecases/auth/register-usecase';
import { LoginUseCase } from '../domain/usecases/auth/login-usecase';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: AuthRepository,
      useClass: AuthApiRepository
    },
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    RegisterUseCase,
    LoginUseCase
  ]
};
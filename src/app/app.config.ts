import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {  provideHttpClient } from '@angular/common/http';


import { AuthRepository } from '../domain/repositories/auth-repository';
import { RegisterUseCase } from '../domain/usecases/auth/register-usecase';
import { LoginUseCase } from '../domain/usecases/auth/login-usecase';
import { AuthApiRepository } from '../data/repositories/auth/auth-api-repository';
import { TaskRepository } from '../domain/repositories/task-repository';
import { TaskApiRepository } from '../data/repositories/task/task-api-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: AuthRepository,
      useClass: AuthApiRepository
    },
    {
      provide: TaskRepository,
      useClass: TaskApiRepository
    },
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    RegisterUseCase,
    LoginUseCase
  ]
};
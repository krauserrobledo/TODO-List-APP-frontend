import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {  provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthRepository } from '../domain/repositories/auth-repository';
import { RegisterUseCase } from '../domain/usecases/auth/register-usecase';
import { LoginUseCase } from '../domain/usecases/auth/login-usecase';
import { AuthApiRepository } from '../data/repositories/auth-api-repository';
import { TaskRepository } from '../domain/repositories/task-repository';
import { TaskApiRepository } from '../data/repositories/task-api-repository';
import { authInterceptor } from '../base/interceptors/auth-interceptor';
import { CategoryRepository } from '../domain/repositories/category-repository';
import { CategoryApiRepository } from '../data/repositories/category-api-repository';
import { TagRepository } from '../domain/repositories/tag-repository';
import { TagApiRepository } from '../data/repositories/tag-api-repository';
import { SubtaskRepository } from '../domain/repositories/subtask-repository';
import { SubtaskApiRepository } from '../data/repositories/subtask-api-repository';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: AuthRepository,
      useClass: AuthApiRepository
    },
    {
      provide: TaskRepository,
      useClass: TaskApiRepository
    },
    {
      provide: CategoryRepository,
      useClass: CategoryApiRepository
    },
    {
      provide: TagRepository,
      useClass: TagApiRepository
    },
    {
      provide: SubtaskRepository,
      useClass: SubtaskApiRepository
    },
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
          preset :Aura
        }
    }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    RegisterUseCase,
    LoginUseCase
  ]
};
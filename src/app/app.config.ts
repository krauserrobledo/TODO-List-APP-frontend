import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import {  provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthRepository } from '../domain/i-repositories/auth-repository';
import { RegisterUseCase } from '../domain/usecases/auth/register-usecase';
import { LoginUseCase } from '../domain/usecases/auth/login-usecase';
import { AuthApiRepository } from '../data/repositories/auth-api-repository';
import { TaskRepository } from '../domain/i-repositories/task-repository';
import { TaskApiRepository } from '../data/repositories/task-api-repository';
import { authInterceptor } from '../base/interceptors/auth-interceptor';
import { CategoryRepository } from '../domain/i-repositories/category-repository';
import { CategoryApiRepository } from '../data/repositories/category-api-repository';
import { TagRepository } from '../domain/i-repositories/tag-repository';
import { TagApiRepository } from '../data/repositories/tag-api-repository';
import { SubtaskRepository } from '../domain/i-repositories/subtask-repository';
import { SubtaskApiRepository } from '../data/repositories/subtask-api-repository';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { withNgxsWebSocketPlugin } from '@ngxs/websocket-plugin';
import { provideStore } from '@ngxs/store';

import { CategoryState } from '../presentation/stores/category/category.state';
import { TagState } from '../presentation/stores/tag/tag.state';
import { TaskState } from '../presentation/stores/task/task.state';
import { AuthState } from '../presentation/stores/auth/auth.state';
import { SubtaskState } from '../presentation/stores/subtask/subtask.state'

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
          preset :Aura,
          options: {
            cssLayer:{
              name:'primeng',
              order:'tailwind-base, primeng, tailwind-utilities'

          }
        }
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    RegisterUseCase,
    LoginUseCase, 
    provideStore(
[CategoryState,
  TagState,
  TaskState,
  AuthState,
  SubtaskState],
withNgxsReduxDevtoolsPlugin(),
withNgxsFormPlugin(),
withNgxsLoggerPlugin(),
withNgxsRouterPlugin(),
withNgxsWebSocketPlugin()),
  ]
};


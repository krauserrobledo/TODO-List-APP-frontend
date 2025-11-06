import { Injectable, inject } from '@angular/core';
import { environment } from './environment';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  get apiUrl(): string {
    return environment.apiUrl;
  }

  isProduction(): boolean {
    return environment.production;
  }
}